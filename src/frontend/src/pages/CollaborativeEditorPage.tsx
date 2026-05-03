import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useChapter } from "@/hooks/useApi";
import { usePublishChapter } from "@/hooks/useAuthor";
import {
  useGetActiveSessions,
  useGetChapterDraft,
  useJoinSession,
  useLeaveSession,
  useSaveChapterDraft,
} from "@/hooks/useCollab";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, FileText, Save, Send, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function wordCount(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function readingTime(text: string): number {
  return Math.max(1, Math.ceil(wordCount(text) / 200));
}

export default function CollaborativeEditorPage() {
  const { novelId, chapterId } = useParams({
    from: "/author/chapter/$novelId/$chapterId/collab",
  });
  const navigate = useNavigate();

  const novelIdBig = BigInt(novelId);
  const chapterIdBig = BigInt(chapterId);

  // ── Server data ──────────────────────────────────────────────────────────
  const { data: chapter, isLoading: chapterLoading } = useChapter(
    novelId,
    chapterId,
  );
  const { data: draft } = useGetChapterDraft(chapterIdBig);
  const { data: activeSessions } = useGetActiveSessions(novelIdBig);

  // ── Mutations ────────────────────────────────────────────────────────────
  const joinSession = useJoinSession();
  const leaveSession = useLeaveSession();
  const saveDraft = useSaveChapterDraft();
  const publishChapter = usePublishChapter();

  // ── Local editor state ───────────────────────────────────────────────────
  const [content, setContent] = useState("");
  const [lastSavedContent, setLastSavedContent] = useState("");
  const [initialized, setInitialized] = useState(false);
  const lastTypedRef = useRef<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Initialise content from chapter data ────────────────────────────────
  useEffect(() => {
    if (!initialized && chapter) {
      setContent(chapter.content);
      setLastSavedContent(chapter.content);
      setInitialized(true);
    }
  }, [chapter, initialized]);

  // ── Join on mount, leave on unmount ──────────────────────────────────────
  // biome-ignore lint/correctness/useExhaustiveDependencies: join/leave on mount only
  useEffect(() => {
    joinSession.mutate({ chapterId: chapterIdBig, novelId: novelIdBig });
    return () => {
      leaveSession.mutate({ chapterId: chapterIdBig, novelId: novelIdBig });
    };
  }, []);

  // ── Sync remote draft if idle ≥ 5 s ─────────────────────────────────────
  useEffect(() => {
    if (!draft?.lastContent || !initialized) return;
    const remoteContent = draft.lastContent;
    if (remoteContent === content) return;

    const idleSince = Date.now() - lastTypedRef.current;
    if (idleSince >= 5000) {
      setContent(remoteContent);
      toast.info("Updated by co-author", {
        description: "Editor content has been refreshed with the latest draft.",
        className: "collaboration-toast",
        duration: 4000,
      });
    }
  }, [draft?.lastContent, content, initialized]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
      lastTypedRef.current = Date.now();
    },
    [],
  );

  const handleSaveDraft = useCallback(() => {
    saveDraft.mutate(
      { chapterId: chapterIdBig, content },
      {
        onSuccess: (result) => {
          if (result.__kind__ === "err") {
            toast.error("Failed to save draft", { description: result.err });
            return;
          }
          setLastSavedContent(content);
          toast.success("Draft saved", { duration: 3000 });
        },
        onError: (err) => {
          toast.error("Failed to save draft", { description: err.message });
        },
      },
    );
  }, [chapterIdBig, content, saveDraft]);

  // ── Keyboard shortcut Ctrl/Cmd+S ─────────────────────────────────────────
  // biome-ignore lint/correctness/useExhaustiveDependencies: mount-only
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSaveDraft();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePublish = useCallback(() => {
    publishChapter.mutate(
      { chapterId: chapterIdBig, novelId: novelIdBig },
      {
        onSuccess: (result) => {
          if (result.__kind__ === "err") {
            toast.error("Publish failed", { description: result.err });
            return;
          }
          toast.success("Chapter published!");
          navigate({ to: "/novel/$id", params: { id: novelId } });
        },
        onError: (err) => {
          toast.error("Publish failed", { description: err.message });
        },
      },
    );
  }, [chapterIdBig, novelIdBig, novelId, publishChapter, navigate]);

  const handleLeave = useCallback(() => {
    leaveSession.mutate(
      { chapterId: chapterIdBig, novelId: novelIdBig },
      {
        onSettled: () => {
          navigate({ to: "/novel/$id", params: { id: novelId } });
        },
      },
    );
  }, [chapterIdBig, novelIdBig, novelId, leaveSession, navigate]);

  // ── Derived state ─────────────────────────────────────────────────────────
  const hasUnsavedChanges = content !== lastSavedContent;
  const words = wordCount(content);
  const minutes = readingTime(content);
  const chars = content.length;

  // Active editors (from current active session for this chapter)
  const currentSession = activeSessions?.find(
    (s) => s.chapterId === chapterIdBig,
  );
  const activeEditors: string[] = (currentSession?.activeEditors ?? []).map(
    (p) => p.toText(),
  );

  // ── Loading state ─────────────────────────────────────────────────────────
  if (chapterLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="h-14 bg-card border-b border-border flex items-center px-6 gap-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-40 ml-auto" />
          <Skeleton className="h-8 w-28" />
        </div>
        <div className="flex flex-1 gap-0">
          <div className="flex-1 p-6">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-[60vh] w-full rounded-lg" />
          </div>
          <div className="w-64 border-l border-border p-4">
            <Skeleton className="h-6 w-32 mb-4" />
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-full mb-2 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="collab-editor.page"
    >
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header className="h-14 bg-card border-b border-border flex items-center px-4 gap-3 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLeave}
          data-ocid="collab-editor.leave_button"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Leave
        </Button>

        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-foreground truncate font-display">
            {hasUnsavedChanges ? "* " : ""}
            {chapter?.title ?? "Chapter Editor"}
          </h1>
          <p className="text-xs text-muted-foreground truncate">
            Collaborative editing mode
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={saveDraft.isPending || !hasUnsavedChanges}
            data-ocid="collab-editor.save_button"
            className="gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            {saveDraft.isPending ? "Saving…" : "Save Draft"}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                data-ocid="collab-editor.open_modal_button"
                className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Send className="h-3.5 w-3.5" />
                Publish
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent data-ocid="collab-editor.dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>Publish this chapter?</AlertDialogTitle>
                <AlertDialogDescription>
                  Publishing will make this chapter visible to all readers.
                  {hasUnsavedChanges &&
                    " You have unsaved changes — they will be included."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-ocid="collab-editor.cancel_button">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handlePublish}
                  disabled={publishChapter.isPending}
                  data-ocid="collab-editor.confirm_button"
                >
                  {publishChapter.isPending ? "Publishing…" : "Publish"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      {/* ── Main layout ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Editor pane ──────────────────────────────────────────────── */}
        <main className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              placeholder="Start writing your chapter…"
              data-ocid="collab-editor.editor"
              className={
                "flex-1 w-full resize-none rounded-lg border border-border bg-card/50 " +
                "px-4 py-3 text-foreground font-body text-base leading-relaxed " +
                "placeholder:text-muted-foreground focus:outline-none focus:ring-2 " +
                "focus:ring-accent/40 transition-colors duration-200 min-h-[60vh]"
              }
              spellCheck
            />
          </div>

          {/* ── Stats bar ──────────────────────────────────────────────── */}
          <footer className="border-t border-border bg-card/60 px-4 md:px-6 py-2 flex items-center gap-4 text-xs text-muted-foreground shrink-0">
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              <span data-ocid="collab-editor.char_count">
                {chars.toLocaleString()} chars
              </span>
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5 opacity-0" aria-hidden />
              <span data-ocid="collab-editor.word_count">
                {words.toLocaleString()} words
              </span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span data-ocid="collab-editor.reading_time">
                ~{minutes} min read
              </span>
            </span>
            {hasUnsavedChanges && (
              <span
                className="ml-auto text-secondary font-medium"
                data-ocid="collab-editor.unsaved_indicator"
              >
                ● Unsaved changes
              </span>
            )}
          </footer>
        </main>

        {/* ── Co-author sidebar ─────────────────────────────────────────── */}
        <aside
          className="w-60 shrink-0 border-l border-border bg-card/40 flex flex-col hidden md:flex"
          data-ocid="collab-editor.panel"
        >
          <div className="px-4 pt-4 pb-2 border-b border-border">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              Active Co-Authors
            </h2>
          </div>

          <ScrollArea className="flex-1 px-3 py-3">
            {activeEditors.length === 0 ? (
              <div
                className="text-xs text-muted-foreground py-6 text-center"
                data-ocid="collab-editor.empty_state"
              >
                <Users className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p>
                  No other authors
                  <br />
                  online right now.
                </p>
              </div>
            ) : (
              <ul className="space-y-2" data-ocid="collab-editor.list">
                {activeEditors.map((editorId, idx) => {
                  const shortName = `${editorId.slice(0, 5)}…${editorId.slice(-4)}`;
                  return (
                    <li
                      key={editorId}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-muted/30 transition-colors duration-200"
                      data-ocid={`collab-editor.item.${idx + 1}`}
                    >
                      <div className="co-author-avatar shrink-0">
                        {editorId.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {shortName}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Editing
                        </p>
                      </div>
                      <span
                        className="presence-indicator shrink-0"
                        aria-label="Online"
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </ScrollArea>

          {/* Polling indicator */}
          <div className="px-4 pb-4 pt-2 border-t border-border">
            <p className="text-[10px] text-muted-foreground/60 text-center">
              Syncing every 3s
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
