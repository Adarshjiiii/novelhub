import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useChapter, useChapters, useNovel } from "@/hooks/useApi";
import {
  useAddChapter,
  usePublishChapter,
  useUpdateChapter,
} from "@/hooks/useAuthor";
import {
  useGetActiveSessions,
  useGetChapterDraft,
  useJoinSession,
  useLeaveSession,
  useSaveChapterDraft,
} from "@/hooks/useCollab";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Save, Send, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Presence indicator for collaborative editing ─────────────────────────────

function PresenceBar({
  novelId,
  chapterId,
}: { novelId: bigint; chapterId: bigint | null }) {
  const { data: sessions } = useGetActiveSessions(novelId);
  const relevant = sessions?.find(
    (s) => chapterId !== null && s.chapterId === chapterId,
  );
  const editorCount = relevant?.activeEditors.length ?? 0;
  if (editorCount <= 1) return null;
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/20 text-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
      </span>
      <Users className="h-3.5 w-3.5 text-accent" />
      <span className="text-accent font-medium">
        {editorCount} editors active
      </span>
    </div>
  );
}

// ── New chapter creation form ─────────────────────────────────────────────────

function NewChapterForm({ novelId }: { novelId: string }) {
  const { data: novel, isLoading: novelLoading } = useNovel(novelId);
  const { data: chapters } = useChapters(novelId);
  const addChapter = useAddChapter();
  const navigate = useNavigate();

  const nextNumber = chapters ? chapters.length + 1 : 1;
  const [title, setTitle] = useState("");
  const [orderNum, setOrderNum] = useState(String(nextNumber));

  // Sync order once chapters load
  useEffect(() => {
    if (chapters) setOrderNum(String(chapters.length + 1));
  }, [chapters]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Chapter title is required");
      return;
    }
    try {
      const chapterId = await addChapter.mutateAsync({
        title: title.trim(),
        content: "",
        chapterNumber: BigInt(orderNum || nextNumber),
        novelId: BigInt(novelId),
      });
      toast.success("Chapter created! Opening editor…");
      navigate({
        to: "/author/chapter/$novelId/$chapterId/collab",
        params: { novelId, chapterId: chapterId.toString() },
      });
    } catch {
      toast.error("Failed to create chapter");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10" data-ocid="chapter-form.page">
      {/* Back button */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => navigate({ to: "/author-dashboard" })}
        className="-ml-2 mb-6"
        data-ocid="chapter-form.back_button"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
      </Button>

      {/* Novel context header */}
      <div className="mb-6">
        {novelLoading ? (
          <Skeleton className="h-7 w-64" />
        ) : novel ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <BookOpen className="h-4 w-4" />
            <span className="font-medium text-foreground truncate">
              {novel.title}
            </span>
          </div>
        ) : null}
        <h1 className="text-2xl font-display font-semibold text-foreground">
          New Chapter
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Set the title and position, then write in the collaborative editor.
        </p>
      </div>

      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle className="font-display text-lg">
            Chapter Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="ch-title">
                Chapter Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ch-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Storm Arrives"
                required
                autoFocus
                data-ocid="chapter-form.title_input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ch-num">Position / Order</Label>
              <Input
                id="ch-num"
                type="number"
                min={1}
                value={orderNum}
                onChange={(e) => setOrderNum(e.target.value)}
                data-ocid="chapter-form.chapter_number_input"
              />
              <p className="text-xs text-muted-foreground">
                Chapter number in reading order. Defaults to next in sequence (
                {nextNumber}).
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                disabled={addChapter.isPending}
                data-ocid="chapter-form.submit_button"
              >
                {addChapter.isPending ? "Creating…" : "Create & Open Editor"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/author-dashboard" })}
                data-ocid="chapter-form.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Edit chapter form (collab editor) ─────────────────────────────────────────

function EditChapterForm({
  novelId,
  chapterId,
}: { novelId: string; chapterId: string }) {
  const novelIdBig = BigInt(novelId);
  const chapterIdBig = BigInt(chapterId);

  const { data: existing } = useChapter(novelId, chapterId);
  const { data: draft } = useGetChapterDraft(chapterIdBig);
  const { data: novel } = useNovel(novelId);
  const updateChapter = useUpdateChapter();
  const publishChapter = usePublishChapter();
  const saveDraft = useSaveChapterDraft();
  const joinSession = useJoinSession();
  const leaveSession = useLeaveSession();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [chapterNumber, setChapterNumber] = useState("1");
  const [joined, setJoined] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setContent(existing.content);
      setChapterNumber(existing.chapterNumber.toString());
    }
  }, [existing]);

  useEffect(() => {
    if (draft?.lastContent && !existing) setContent(draft.lastContent);
  }, [draft, existing]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: join/leave on mount only
  useEffect(() => {
    joinSession.mutate({ chapterId: chapterIdBig, novelId: novelIdBig });
    setJoined(true);
    return () => {
      if (joined)
        leaveSession.mutate({ chapterId: chapterIdBig, novelId: novelIdBig });
    };
  }, []);

  const autosave = useCallback(
    (val: string) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveDraft.mutate({ chapterId: chapterIdBig, content: val });
      }, 2000);
    },
    [chapterIdBig, saveDraft],
  );

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    autosave(e.target.value);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateChapter.mutateAsync({
        chapterId: chapterIdBig,
        title,
        content,
        novelId: novelIdBig,
      });
      toast.success("Chapter saved");
    } catch {
      toast.error("Failed to save chapter");
    }
  };

  const handlePublish = async () => {
    try {
      const result = await publishChapter.mutateAsync({
        chapterId: chapterIdBig,
        novelId: novelIdBig,
      });
      if (result.__kind__ === "err") throw new Error(result.err);
      toast.success("Chapter published!");
      navigate({ to: "/author-dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to publish");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8" data-ocid="chapter-form.page">
      <div className="flex items-center justify-between mb-6">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: "/author-dashboard" })}
          className="-ml-2"
          data-ocid="chapter-form.back_button"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <PresenceBar novelId={novelIdBig} chapterId={chapterIdBig} />
      </div>

      {novel && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
          <BookOpen className="h-4 w-4" />
          <span className="font-medium text-foreground">{novel.title}</span>
        </div>
      )}

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-xl">Edit Chapter</CardTitle>
            {saveDraft.isPending && (
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                Saving draft…
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="ch-title">Chapter Title</Label>
                <Input
                  id="ch-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Chapter title"
                  required
                  data-ocid="chapter-form.title_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ch-num">Chapter #</Label>
                <Input
                  id="ch-num"
                  type="number"
                  min={1}
                  value={chapterNumber}
                  onChange={(e) => setChapterNumber(e.target.value)}
                  disabled
                  data-ocid="chapter-form.chapter_number_input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ch-content">Content</Label>
              <textarea
                id="ch-content"
                value={content}
                onChange={handleContentChange}
                placeholder="Start writing your chapter…"
                rows={20}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-body leading-relaxed resize-y"
                data-ocid="chapter-form.editor"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                type="submit"
                disabled={updateChapter.isPending}
                data-ocid="chapter-form.save_button"
              >
                <Save className="h-4 w-4 mr-2" />
                {updateChapter.isPending ? "Saving…" : "Save Draft"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handlePublish}
                disabled={publishChapter.isPending}
                data-ocid="chapter-form.submit_button"
              >
                <Send className="h-4 w-4 mr-2" />
                {publishChapter.isPending ? "Publishing…" : "Publish"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Route dispatcher ──────────────────────────────────────────────────────────

export default function ChapterFormPage() {
  // /author/novel/$id/chapter/new  → params.id
  // /author/chapter/$novelId/$chapterId/edit → params.novelId + params.chapterId
  const params = useParams({ strict: false }) as {
    id?: string;
    novelId?: string;
    chapterId?: string;
  };

  const isNewRoute = !!params.id && !params.chapterId;
  const novelId = params.novelId ?? params.id ?? "";
  const chapterId = params.chapterId ?? null;

  if (isNewRoute) {
    return <NewChapterForm novelId={novelId} />;
  }

  if (chapterId) {
    return <EditChapterForm novelId={novelId} chapterId={chapterId} />;
  }

  // Fallback — shouldn't happen given route definitions
  return (
    <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
      Invalid route parameters.
    </div>
  );
}
