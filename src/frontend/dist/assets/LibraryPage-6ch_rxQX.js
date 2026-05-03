import { c as createLucideIcon, j as jsxRuntimeExports, i as Search, I as Input, X, r as reactExports, u as useAuth, h as useNovels, g as useReadingHistory, T as TrendingUp, S as Star, D as DropdownMenu, k as DropdownMenuTrigger, d as Button, l as DropdownMenuContent, m as DropdownMenuItem, n as BookMarked, L as Link, B as BookOpen, b as Skeleton } from "./index-S5JeUSL8.js";
import { B as Badge } from "./badge-BDYn-sE1.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-0PJpZZt6.js";
import { E as Eye } from "./eye-BR5d8HU-.js";
import { H as Heart } from "./heart-BivMy_4S.js";
import { C as ChevronDown } from "./chevron-down-WRZvhiEL.js";
import { C as ChevronLeft } from "./chevron-left-CwdlS1_L.js";
import { C as ChevronRight } from "./chevron-right-D2GsC6BU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M20 8h-5", key: "1vsyxs" }],
  ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10", key: "ag13bf" }],
  ["path", { d: "M15 14h5l-5 6h5", key: "ur5jdg" }]
];
const ArrowDownAZ = createLucideIcon("arrow-down-a-z", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }],
  ["path", { d: "M11 16h7", key: "uosisv" }],
  ["path", { d: "M11 20h10", key: "jvxblo" }]
];
const ArrowUpNarrowWide = createLucideIcon("arrow-up-narrow-wide", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
const GENRES = [
  { label: "All", value: "All" },
  { label: "Fantasy", value: "Fantasy" },
  { label: "Romance", value: "Romance" },
  { label: "Sci-Fi", value: "Sci-Fi" },
  { label: "Mystery", value: "Mystery" },
  { label: "Thriller", value: "Thriller" },
  { label: "Cyberpunk", value: "Cyberpunk" },
  { label: "Horror", value: "Horror" },
  { label: "Historical", value: "Historical" },
  { label: "Drama", value: "Drama" },
  { label: "YA", value: "YA" },
  { label: "Mythology", value: "Mythology" },
  { label: "Adventure", value: "Adventure" }
];
function GenreFilter({ active, onSelect }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex gap-2 overflow-x-auto scrollbar-none pb-1",
      role: "tablist",
      "aria-label": "Genre filter",
      children: GENRES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": active === g.value,
          onClick: () => onSelect(g.value),
          className: `shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active === g.value ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30" : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"}`,
          "data-ocid": `library.genre.${g.value.toLowerCase().replace("-", "_")}`,
          children: g.label
        },
        g.value
      ))
    }
  );
}
function SearchBar({
  value,
  onChange,
  placeholder = "Search titles, authors…",
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex-1 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder,
        value,
        onChange: (e) => onChange(e.target.value),
        className: "pl-9 pr-9 bg-muted/50 border-border focus:bg-card transition-colors duration-200",
        "data-ocid": "library.search_input"
      }
    ),
    value && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(""),
        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150",
        "aria-label": "Clear search",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
      }
    )
  ] });
}
const SORT_OPTIONS = [
  { label: "Latest", value: "latest", icon: TrendingUp },
  { label: "Most Read", value: "most_read", icon: Eye },
  { label: "Highest Rated", value: "highest_rated", icon: Star },
  { label: "Alphabetical", value: "alphabetical", icon: ArrowDownAZ },
  { label: "Most Liked", value: "most_liked", icon: Heart }
];
const PAGE_SIZE = 12;
function NovelGridCard({ novel, index }) {
  const statusColor = novel.status === "completed" ? "text-accent border-accent/40" : novel.status === "ongoing" ? "text-secondary border-secondary/40" : "text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/novel/$id",
      params: { id: novel.id },
      "data-ocid": `library.novel.item.${index}`,
      className: "block group",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3] overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: novel.coverImage,
              alt: novel.title,
              className: "w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 left-2 flex gap-1.5 flex-wrap", children: [
            novel.isTrending && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary text-secondary-foreground shadow", children: "HOT" }),
            novel.isNew && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent text-accent-foreground shadow", children: "NEW" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/90 backdrop-blur-sm text-[11px] font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-secondary text-secondary" }),
            novel.rating.toFixed(1)
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground line-clamp-5 leading-relaxed", children: novel.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "w-full max-w-[140px] bg-primary text-primary-foreground hover:bg-primary/90",
                "data-ocid": `library.read_now.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "Read Now"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm leading-tight line-clamp-2", children: novel.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: novel.author }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
            novel.genre.slice(0, 1).map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] px-1.5 py-0 font-medium",
                children: g
              },
              g
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-[10px] px-1.5 py-0 ${statusColor}`,
                children: novel.status
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11px] text-muted-foreground pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
              (novel.views / 1e3).toFixed(0),
              "K"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              novel.chapterCount,
              " ch."
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function NovelGridSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] w-full rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-4/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" })
    ] })
  ] });
}
function LibraryPage() {
  var _a;
  const [search, setSearch] = reactExports.useState("");
  const [activeGenre, setActiveGenre] = reactExports.useState("All");
  const [activeTab, setActiveTab] = reactExports.useState("discover");
  const [sort, setSort] = reactExports.useState("latest");
  const [page, setPage] = reactExports.useState(1);
  const { principal } = useAuth();
  const { data: novels, isLoading } = useNovels(
    activeGenre === "All" ? void 0 : activeGenre
  );
  const { data: history } = useReadingHistory(principal ?? void 0);
  const sorted = reactExports.useMemo(() => {
    if (!novels) return [];
    const base = novels.filter(
      (n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.author.toLowerCase().includes(search.toLowerCase())
    );
    switch (sort) {
      case "most_read":
        return [...base].sort((a, b) => b.views - a.views);
      case "highest_rated":
        return [...base].sort((a, b) => b.rating - a.rating);
      case "alphabetical":
        return [...base].sort((a, b) => a.title.localeCompare(b.title));
      case "most_liked":
        return [...base].sort((a, b) => b.likes - a.likes);
      default:
        return [...base].sort((a, b) => b.updatedAt - a.updatedAt);
    }
  }, [novels, search, sort]);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeSortLabel = ((_a = SORT_OPTIONS.find((o) => o.value === sort)) == null ? void 0 : _a.label) ?? "Sort";
  function handleGenreSelect(genre) {
    setActiveGenre(genre);
    setPage(1);
  }
  function handleSearch(value) {
    setSearch(value);
    setPage(1);
  }
  const SKELETON_ITEMS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "library.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold mb-1", children: "Browse Library" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Discover thousands of novels across every genre" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tabs,
      {
        value: activeTab,
        onValueChange: (v) => setActiveTab(v),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "discover", "data-ocid": "library.discover_tab", children: "Discover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "reading", "data-ocid": "library.reading_tab", children: "Reading" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "bookmarked", "data-ocid": "library.bookmarked_tab", children: "Bookmarked" })
        ] })
      }
    ),
    activeTab === "discover" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, { value: search, onChange: handleSearch }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "shrink-0 gap-1.5 text-sm",
            "data-ocid": "library.sort_dropdown",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpNarrowWide, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: activeSortLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 opacity-60" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "end", className: "w-44", children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DropdownMenuItem,
          {
            onClick: () => {
              setSort(opt.value);
              setPage(1);
            },
            className: `gap-2 ${sort === opt.value ? "text-primary font-medium" : ""}`,
            "data-ocid": `library.sort.${opt.value}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(opt.icon, { className: "h-3.5 w-3.5 shrink-0" }),
              opt.label
            ]
          },
          opt.value
        )) })
      ] })
    ] }),
    activeTab === "discover" && /* @__PURE__ */ jsxRuntimeExports.jsx(GenreFilter, { active: activeGenre, onSelect: handleGenreSelect }),
    activeTab === "discover" && (isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
        "data-ocid": "library.loading_state",
        children: SKELETON_ITEMS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(NovelGridSkeleton, {}, k))
      }
    ) : paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-muted-foreground rounded-xl border border-dashed border-border",
        "data-ocid": "library.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-12 w-12 mb-4 opacity-25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold", children: "No novels found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1 mb-4", children: "Try a different search term or genre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => {
                setSearch("");
                setActiveGenre("All");
              },
              "data-ocid": "library.clear_filters_button",
              children: "Clear filters"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: paginated.map((novel, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        NovelGridCard,
        {
          novel,
          index: (page - 1) * PAGE_SIZE + i + 1
        },
        novel.id
      )) }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-center gap-2 pt-2",
          "data-ocid": "library.pagination",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                disabled: page === 1,
                onClick: () => setPage((p) => p - 1),
                "aria-label": "Previous page",
                "data-ocid": "library.pagination_prev",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
              }
            ),
            Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: page === p ? "default" : "outline",
                  size: "icon",
                  onClick: () => setPage(p),
                  "aria-label": `Page ${p}`,
                  "aria-current": page === p ? "page" : void 0,
                  "data-ocid": `library.page_btn.${p}`,
                  className: "w-9 h-9 text-sm",
                  children: p
                },
                p
              )
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                disabled: page === totalPages,
                onClick: () => setPage((p) => p + 1),
                "aria-label": "Next page",
                "data-ocid": "library.pagination_next",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
              }
            )
          ]
        }
      )
    ] })),
    activeTab === "reading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (history ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-muted-foreground rounded-xl border border-dashed border-border",
        "data-ocid": "library.reading_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-12 w-12 mb-4 opacity-25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold", children: "No novels in progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Start reading to see your progress here" })
        ]
      }
    ) : history == null ? void 0 : history.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/novel/$id",
        params: { id: item.novelId },
        "data-ocid": `library.reading_item.${i + 1}`,
        className: "block",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] bg-muted rounded-md overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.novelCover,
              alt: item.novelTitle,
              className: "w-full h-full object-cover"
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm line-clamp-1 mb-0.5", children: item.novelTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2", children: [
              "Chapter ",
              item.chapterNumber,
              " of ",
              item.totalChapters
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-primary rounded-full transition-all duration-300",
                style: { width: `${item.progressPercent}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-1", children: [
              item.progressPercent,
              "% complete"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }) })
        ] })
      },
      item.novelId
    )) }),
    activeTab === "bookmarked" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-muted-foreground rounded-xl border border-dashed border-border",
        "data-ocid": "library.bookmarked_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-12 w-12 mb-4 opacity-25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold", children: "No bookmarked novels" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Bookmark novels while browsing to find them here" })
        ]
      }
    )
  ] });
}
export {
  LibraryPage as default
};
