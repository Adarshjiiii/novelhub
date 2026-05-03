import { q as useParams, j as jsxRuntimeExports, s as useNovel, t as useChapters, $ as useNavigate, r as reactExports, d as Button, b as Skeleton, B as BookOpen, I as Input, Q as useChapter, A as ue, U as Users } from "./index-S5JeUSL8.js";
import { B as Badge } from "./badge-BDYn-sE1.js";
import { C as Card, a as CardHeader, d as CardTitle, b as CardContent } from "./card-Ct53rAn-.js";
import { L as Label } from "./label-BUN4A1ls.js";
import { g as useAddChapter, h as useUpdateChapter, i as usePublishChapter } from "./useAuthor-Dsu2eX6L.js";
import { u as useGetChapterDraft, a as useSaveChapterDraft, b as useJoinSession, c as useLeaveSession, S as Send, d as useGetActiveSessions } from "./useCollab-CkeyuM3o.js";
import { A as ArrowLeft } from "./arrow-left-y2RRM2sg.js";
import { S as Save } from "./save-BDHlakfy.js";
import "./index-CC8UjWnc.js";
function PresenceBar({
  novelId,
  chapterId
}) {
  const { data: sessions } = useGetActiveSessions(novelId);
  const relevant = sessions == null ? void 0 : sessions.find(
    (s) => chapterId !== null && s.chapterId === chapterId
  );
  const editorCount = (relevant == null ? void 0 : relevant.activeEditors.length) ?? 0;
  if (editorCount <= 1) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/20 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-accent" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-accent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent font-medium", children: [
      editorCount,
      " editors active"
    ] })
  ] });
}
function NewChapterForm({ novelId }) {
  const { data: novel, isLoading: novelLoading } = useNovel(novelId);
  const { data: chapters } = useChapters(novelId);
  const addChapter = useAddChapter();
  const navigate = useNavigate();
  const nextNumber = chapters ? chapters.length + 1 : 1;
  const [title, setTitle] = reactExports.useState("");
  const [orderNum, setOrderNum] = reactExports.useState(String(nextNumber));
  reactExports.useEffect(() => {
    if (chapters) setOrderNum(String(chapters.length + 1));
  }, [chapters]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      ue.error("Chapter title is required");
      return;
    }
    try {
      const chapterId = await addChapter.mutateAsync({
        title: title.trim(),
        content: "",
        chapterNumber: BigInt(orderNum || nextNumber),
        novelId: BigInt(novelId)
      });
      ue.success("Chapter created! Opening editor…");
      navigate({
        to: "/author/chapter/$novelId/$chapterId/collab",
        params: { novelId, chapterId: chapterId.toString() }
      });
    } catch {
      ue.error("Failed to create chapter");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto px-4 py-10", "data-ocid": "chapter-form.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "sm",
        onClick: () => navigate({ to: "/author-dashboard" }),
        className: "-ml-2 mb-6",
        "data-ocid": "chapter-form.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
          " Back to Dashboard"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      novelLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-64" }) : novel ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: novel.title })
      ] }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-semibold text-foreground", children: "New Chapter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Set the title and position, then write in the collaborative editor." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Chapter Details" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ch-title", children: [
            "Chapter Title ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ch-title",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "e.g. The Storm Arrives",
              required: true,
              autoFocus: true,
              "data-ocid": "chapter-form.title_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ch-num", children: "Position / Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ch-num",
              type: "number",
              min: 1,
              value: orderNum,
              onChange: (e) => setOrderNum(e.target.value),
              "data-ocid": "chapter-form.chapter_number_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Chapter number in reading order. Defaults to next in sequence (",
            nextNumber,
            ")."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: addChapter.isPending,
              "data-ocid": "chapter-form.submit_button",
              children: addChapter.isPending ? "Creating…" : "Create & Open Editor"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => navigate({ to: "/author-dashboard" }),
              "data-ocid": "chapter-form.cancel_button",
              children: "Cancel"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
function EditChapterForm({
  novelId,
  chapterId
}) {
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
  const [title, setTitle] = reactExports.useState("");
  const [content, setContent] = reactExports.useState("");
  const [chapterNumber, setChapterNumber] = reactExports.useState("1");
  const [joined, setJoined] = reactExports.useState(false);
  const saveTimer = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setContent(existing.content);
      setChapterNumber(existing.chapterNumber.toString());
    }
  }, [existing]);
  reactExports.useEffect(() => {
    if ((draft == null ? void 0 : draft.lastContent) && !existing) setContent(draft.lastContent);
  }, [draft, existing]);
  reactExports.useEffect(() => {
    joinSession.mutate({ chapterId: chapterIdBig, novelId: novelIdBig });
    setJoined(true);
    return () => {
      if (joined)
        leaveSession.mutate({ chapterId: chapterIdBig, novelId: novelIdBig });
    };
  }, []);
  const autosave = reactExports.useCallback(
    (val) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveDraft.mutate({ chapterId: chapterIdBig, content: val });
      }, 2e3);
    },
    [chapterIdBig, saveDraft]
  );
  const handleContentChange = (e) => {
    setContent(e.target.value);
    autosave(e.target.value);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateChapter.mutateAsync({
        chapterId: chapterIdBig,
        title,
        content,
        novelId: novelIdBig
      });
      ue.success("Chapter saved");
    } catch {
      ue.error("Failed to save chapter");
    }
  };
  const handlePublish = async () => {
    try {
      const result = await publishChapter.mutateAsync({
        chapterId: chapterIdBig,
        novelId: novelIdBig
      });
      if (result.__kind__ === "err") throw new Error(result.err);
      ue.success("Chapter published!");
      navigate({ to: "/author-dashboard" });
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to publish");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8", "data-ocid": "chapter-form.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => navigate({ to: "/author-dashboard" }),
          className: "-ml-2",
          "data-ocid": "chapter-form.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
            " Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PresenceBar, { novelId: novelIdBig, chapterId: chapterIdBig })
    ] }),
    novel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: novel.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-xl", children: "Edit Chapter" }),
        saveDraft.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-xs text-muted-foreground",
            children: "Saving draft…"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ch-title", children: "Chapter Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ch-title",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                placeholder: "Chapter title",
                required: true,
                "data-ocid": "chapter-form.title_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ch-num", children: "Chapter #" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ch-num",
                type: "number",
                min: 1,
                value: chapterNumber,
                onChange: (e) => setChapterNumber(e.target.value),
                disabled: true,
                "data-ocid": "chapter-form.chapter_number_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ch-content", children: "Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "ch-content",
              value: content,
              onChange: handleContentChange,
              placeholder: "Start writing your chapter…",
              rows: 20,
              className: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-body leading-relaxed resize-y",
              "data-ocid": "chapter-form.editor"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              disabled: updateChapter.isPending,
              "data-ocid": "chapter-form.save_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
                updateChapter.isPending ? "Saving…" : "Save Draft"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "secondary",
              onClick: handlePublish,
              disabled: publishChapter.isPending,
              "data-ocid": "chapter-form.submit_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4 mr-2" }),
                publishChapter.isPending ? "Publishing…" : "Publish"
              ]
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
function ChapterFormPage() {
  const params = useParams({ strict: false });
  const isNewRoute = !!params.id && !params.chapterId;
  const novelId = params.novelId ?? params.id ?? "";
  const chapterId = params.chapterId ?? null;
  if (isNewRoute) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(NewChapterForm, { novelId });
  }
  if (chapterId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EditChapterForm, { novelId, chapterId });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh] text-muted-foreground", children: "Invalid route parameters." });
}
export {
  ChapterFormPage as default
};
