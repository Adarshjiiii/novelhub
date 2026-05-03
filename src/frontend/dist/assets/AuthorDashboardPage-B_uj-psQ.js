import { c as createLucideIcon, Z as useMyProfile, j as jsxRuntimeExports, b as Skeleton, L as Link, d as Button, B as BookOpen, U as Users, T as TrendingUp, S as Star, _ as SquarePen, A as ue } from "./index-S5JeUSL8.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-D4xy64EP.js";
import { B as Badge } from "./badge-BDYn-sE1.js";
import { C as Card, a as CardHeader, b as CardContent, c as CardFooter } from "./card-Ct53rAn-.js";
import { u as useAuthorNovels, a as useBecomeAuthor, b as useDeleteNovel } from "./useAuthor-Dsu2eX6L.js";
import { P as Plus } from "./plus-CUEIJusS.js";
import "./index-mL3GD8CL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function BecomeAuthorScreen() {
  const becomeAuthor = useBecomeAuthor();
  const handleBecomeAuthor = async () => {
    try {
      await becomeAuthor.mutateAsync();
      ue.success("Welcome to the author community!");
    } catch {
      ue.error("Failed to activate author status. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex flex-col items-center justify-center min-h-[70vh] px-4",
      "data-ocid": "become-author.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 text-accent" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Become an Author" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Join NovelHub's community of writers. Create and publish original novels, collaborate in real-time with co-authors, and reach readers around the world." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 mb-8", children: [
          { icon: BookOpen, label: "Publish Novels" },
          { icon: Users, label: "Co-Author" },
          { icon: TrendingUp, label: "Track Reads" }
        ].map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: label })
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "lg",
            className: "w-full",
            onClick: handleBecomeAuthor,
            disabled: becomeAuthor.isPending,
            "data-ocid": "become-author.register_button",
            children: becomeAuthor.isPending ? "Activating…" : "Start Writing Today"
          }
        )
      ] })
    }
  );
}
function StatsBar({ stats }) {
  const items = [
    { label: "Novels", value: stats.totalNovels, icon: BookOpen },
    {
      label: "Total Reads",
      value: stats.totalReads.toLocaleString(),
      icon: TrendingUp
    },
    {
      label: "Avg Rating",
      value: stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "—",
      icon: Star
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-3 gap-4 mb-8",
      "data-ocid": "author-dashboard.stats",
      children: items.map(({ label, value, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-0 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: label })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-4 px-4 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: value }) })
      ] }, label))
    }
  );
}
function NovelCard({ novel, index }) {
  const deleteNovel = useDeleteNovel();
  const handleDelete = async () => {
    try {
      await deleteNovel.mutateAsync({ novelId: novel.id });
      ue.success(`"${novel.title}" deleted.`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete novel";
      ue.error(msg);
    }
  };
  const isDeleting = deleteNovel.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "bg-card border-border flex flex-col overflow-hidden transition-smooth hover:border-accent/30 hover:shadow-lg",
      "data-ocid": `author-dashboard.novel_card.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 bg-muted overflow-hidden", children: [
          novel.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: novel.coverImage,
              alt: novel.title,
              className: "h-full w-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs author-badge", children: novel.genre }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col flex-1 gap-2 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground line-clamp-2 leading-tight", children: novel.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
              novel.totalReads.toString(),
              " reads"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 text-secondary" }),
              novel.avgRating > 0 ? novel.avgRating.toFixed(1) : "—"
            ] }),
            novel.coAuthors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
              novel.coAuthors.length
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "px-4 pb-4 pt-0 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/author/novel/$id/chapter/new",
              params: { id: novel.id.toString() },
              className: "flex-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "w-full",
                  "data-ocid": `author-dashboard.add_chapter_button.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
                    "Chapter"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/author/novel/$id/edit", params: { id: novel.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              "data-ocid": `author-dashboard.edit_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-3.5 w-3.5" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                "data-ocid": `author-dashboard.delete_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              AlertDialogContent,
              {
                "data-ocid": `author-dashboard.delete_dialog.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
                      "Delete “",
                      novel.title,
                      "”?"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone. All chapters and reading progress associated with this novel will be permanently removed." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AlertDialogCancel,
                      {
                        "data-ocid": `author-dashboard.delete_cancel.${index + 1}`,
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AlertDialogAction,
                      {
                        onClick: handleDelete,
                        disabled: isDeleting,
                        className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                        "data-ocid": `author-dashboard.delete_confirm.${index + 1}`,
                        children: isDeleting ? "Deleting…" : "Delete Novel"
                      }
                    )
                  ] })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function EmptyNovels() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "col-span-full flex flex-col items-center justify-center py-20 text-center",
      "data-ocid": "author-dashboard.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 h-20 w-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No novels yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mb-6", children: "Start writing your first novel and share your stories with the world." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/author/novel/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "author-dashboard.empty_cta_button", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
          "Write Your First Novel"
        ] }) })
      ]
    }
  );
}
function AuthorDashboardPage() {
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: novels, isLoading: novelsLoading } = useAuthorNovels();
  if (profileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-5xl mx-auto px-4 py-8",
        "data-ocid": "author-dashboard.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-64" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" }, i)) })
        ] })
      }
    );
  }
  if (!(profile == null ? void 0 : profile.isAuthor)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(BecomeAuthorScreen, {});
  }
  const stats = {
    totalNovels: (novels == null ? void 0 : novels.length) ?? 0,
    totalReads: (novels == null ? void 0 : novels.reduce((a, n) => a + Number(n.totalReads), 0)) ?? 0,
    avgRating: novels && novels.length > 0 ? novels.reduce((a, n) => a + n.avgRating, 0) / novels.length : 0
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 py-8",
      "data-ocid": "author-dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Author Dashboard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "author-badge", children: "Author" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage your novels, chapters, and collaborations" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/author/novel/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "author-dashboard.create_novel_button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Create Novel"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBar, { stats }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Your Novels" }),
          novels && novels.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            novels.length,
            " total"
          ] })
        ] }),
        novelsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5",
            "data-ocid": "author-dashboard.novels_loading_state",
            children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-xl" }, i))
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5", children: !novels || novels.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyNovels, {}) : novels.map((novel, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(NovelCard, { novel, index: i }, novel.id.toString())) })
      ]
    }
  );
}
export {
  AuthorDashboardPage as default
};
