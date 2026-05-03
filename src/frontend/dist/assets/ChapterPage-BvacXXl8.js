import { c as createLucideIcon, q as useParams, s as useNovel, t as useChapters, Q as useChapter, r as reactExports, j as jsxRuntimeExports, b as Skeleton, B as BookOpen, L as Link, d as Button, V as Sun, W as Moon, Y as ArrowRight } from "./index-S5JeUSL8.js";
import { S as Separator } from "./separator-CxukQ8-B.js";
import { A as ArrowLeft } from "./arrow-left-y2RRM2sg.js";
import { P as Plus } from "./plus-CUEIJusS.js";
import { C as ChevronRight } from "./chevron-right-D2GsC6BU.js";
import { C as ChevronLeft } from "./chevron-left-CwdlS1_L.js";
import "./index-CC8UjWnc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
const FONT_SIZE_CLASSES = {
  sm: "text-base leading-7",
  md: "text-lg leading-8",
  lg: "text-xl leading-9"
};
const THEME_CLASSES = {
  dark: "bg-background text-foreground",
  light: "bg-[oklch(0.97_0_0)] text-[oklch(0.1_0_0)]",
  sepia: "bg-[oklch(0.92_0.04_75)] text-[oklch(0.18_0.05_55)]"
};
function ChapterPage() {
  const { novelId, chapterId } = useParams({ strict: false });
  const { data: novel } = useNovel(novelId);
  const { data: chapters = [] } = useChapters(novelId);
  const { data: chapter, isLoading } = useChapter(novelId, chapterId);
  const [fontSize, setFontSize] = reactExports.useState("md");
  const [readingTheme, setReadingTheme] = reactExports.useState("dark");
  const contentRef = reactExports.useRef(null);
  const currentIdx = chapters.findIndex((c) => c.id === chapterId);
  const prevChapter = currentIdx > 0 ? chapters[currentIdx - 1] : null;
  const nextChapter = currentIdx >= 0 && currentIdx < chapters.length - 1 ? chapters[currentIdx + 1] : null;
  reactExports.useEffect(() => {
    return () => {
      if (chapter) {
        localStorage.setItem(
          `progress-${novelId}`,
          JSON.stringify({
            chapterId,
            chapterNumber: chapter.chapterNumber,
            savedAt: Date.now()
          })
        );
      }
    };
  }, [chapter, chapterId, novelId]);
  reactExports.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  function cycleFontSize() {
    const order = ["sm", "md", "lg"];
    const idx = order.indexOf(fontSize);
    setFontSize(order[(idx + 1) % order.length]);
  }
  function cycleTheme() {
    const order = ["dark", "light", "sepia"];
    const idx = order.indexOf(readingTheme);
    setReadingTheme(order[(idx + 1) % order.length]);
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-8 space-y-4",
        "data-ocid": "chapter.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mt-8", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Skeleton,
            {
              className: `h-4 w-${i % 2 === 0 ? "full" : "5/6"}`
            },
            i
          )) })
        ]
      }
    );
  }
  if (!chapter) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-muted-foreground",
        "data-ocid": "chapter.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-16 w-16 mb-4 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold mb-2", children: "Chapter Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-4", children: "This chapter doesn't exist or was removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/novel/$id", params: { id: novelId }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "chapter.back_button", children: "Back to Novel" }) })
        ]
      }
    );
  }
  const progressPct = chapters.length > 0 ? (currentIdx + 1) / chapters.length * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `min-h-screen transition-colors duration-300 ${THEME_CLASSES[readingTheme]}`,
      "data-ocid": "chapter.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-0 left-0 right-0 h-1 z-50 bg-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-primary transition-all duration-300",
            style: { width: `${progressPct}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-2.5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/novel/$id",
              params: { id: novelId },
              className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mr-auto",
              "data-ocid": "chapter.back_to_novel_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline truncate max-w-40", children: (novel == null ? void 0 : novel.title) ?? "Novel" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 border border-border rounded-lg p-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Decrease font size",
                className: "p-1.5 rounded hover:bg-muted transition-colors disabled:opacity-40",
                onClick: () => fontSize !== "sm" && setFontSize(fontSize === "lg" ? "md" : "sm"),
                disabled: fontSize === "sm",
                "data-ocid": "chapter.font_decrease_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Font size",
                className: "px-2 py-1 text-xs font-mono hover:bg-muted rounded transition-colors",
                onClick: cycleFontSize,
                "data-ocid": "chapter.font_size_toggle",
                children: fontSize.toUpperCase()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Increase font size",
                className: "p-1.5 rounded hover:bg-muted transition-colors disabled:opacity-40",
                onClick: () => fontSize !== "lg" && setFontSize(fontSize === "sm" ? "md" : "lg"),
                disabled: fontSize === "lg",
                "data-ocid": "chapter.font_increase_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": `Switch to ${readingTheme === "dark" ? "light" : readingTheme === "light" ? "sepia" : "dark"} mode`,
              className: "p-2 rounded-lg hover:bg-muted transition-colors border border-border",
              onClick: cycleTheme,
              "data-ocid": "chapter.theme_toggle",
              children: readingTheme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : readingTheme === "light" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "S" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              className: "flex items-center gap-2 text-xs text-muted-foreground mb-6",
              "aria-label": "breadcrumb",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/novel/$id",
                    params: { id: novelId },
                    className: "hover:text-foreground transition-colors truncate max-w-32",
                    children: (novel == null ? void 0 : novel.title) ?? "Novel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate max-w-32", children: [
                  "Ch. ",
                  chapter.chapterNumber
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Chapter ",
                chapter.chapterNumber
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                chapter.wordCount.toLocaleString(),
                " words"
              ] }),
              chapters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  currentIdx + 1,
                  " of ",
                  chapters.length
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-bold leading-tight", children: chapter.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 mb-8",
              "data-ocid": "chapter.nav_top",
              children: [
                prevChapter ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/chapter/$novelId/$chapterId",
                    params: { novelId, chapterId: prevChapter.id },
                    "data-ocid": "chapter.prev_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                      " Previous"
                    ] })
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: true, className: "gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                  " Previous"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/novel/$id",
                    params: { id: novelId },
                    className: "flex-1 text-center",
                    "data-ocid": "chapter.chapter_list_link",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "text-xs text-muted-foreground w-full",
                        children: "All Chapters"
                      }
                    )
                  }
                ),
                nextChapter ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/chapter/$novelId/$chapterId",
                    params: { novelId, chapterId: nextChapter.id },
                    "data-ocid": "chapter.next_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5", children: [
                      "Next ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                    ] })
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: true, className: "gap-1.5", children: [
                  "Next ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-8 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref: contentRef,
              className: `font-body prose max-w-none ${FONT_SIZE_CLASSES[fontSize]}`,
              style: { fontFamily: "var(--font-body)" },
              "data-ocid": "chapter.content",
              children: chapter.content.split("\n\n").slice(0, 60).map((para) => {
                const paraKey = para.trimStart().slice(0, 50);
                return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-5 text-inherit opacity-90", children: para }, paraKey);
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-10 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", "data-ocid": "chapter.nav_bottom", children: [
            prevChapter ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/chapter/$novelId/$chapterId",
                params: { novelId, chapterId: prevChapter.id },
                className: "flex-1",
                "data-ocid": "chapter.prev_bottom_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate min-w-0", children: prevChapter.title })
                ] })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
            nextChapter ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/chapter/$novelId/$chapterId",
                params: { novelId, chapterId: nextChapter.id },
                className: "flex-1",
                "data-ocid": "chapter.next_bottom_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full gap-2 button-primary", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate min-w-0", children: nextChapter.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 shrink-0" })
                ] })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/novel/$id",
                params: { id: novelId },
                className: "flex-1",
                "data-ocid": "chapter.finished_link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                  " Back to Novel"
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ChapterPage as default
};
