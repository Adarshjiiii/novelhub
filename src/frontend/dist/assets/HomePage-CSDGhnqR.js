import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, S as Star, B as BookOpen, T as TrendingUp, u as useAuth, a as useTopNovels, r as reactExports, b as Skeleton, d as Button, e as Library, U as Users, f as Sparkles, g as useReadingHistory, C as Clock, h as useNovels } from "./index-S5JeUSL8.js";
import { B as Badge } from "./badge-BDYn-sE1.js";
import { E as Eye } from "./eye-BR5d8HU-.js";
import { C as ChevronLeft } from "./chevron-left-CwdlS1_L.js";
import { C as ChevronRight } from "./chevron-right-D2GsC6BU.js";
import { F as Flame } from "./flame-gk2_-wdQ.js";
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
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "M8 11h8", key: "vwpz6n" }],
  ["path", { d: "M8 7h6", key: "1f0q6e" }]
];
const BookText = createLucideIcon("book-text", __iconNode);
function formatCount$1(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return String(n);
}
function NovelCard({
  novel,
  rank,
  size = "md",
  dataOcid
}) {
  const isSmall = size === "sm";
  const isLarge = size === "lg";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/novel/$id",
      params: { id: novel.id },
      className: "group block",
      "data-ocid": dataOcid,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `relative rounded-xl overflow-hidden border border-border bg-card ${isLarge ? "" : ""} hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `relative overflow-hidden ${isSmall ? "aspect-[2/3]" : isLarge ? "aspect-[3/4]" : "aspect-[2/3]"} bg-muted`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: novel.coverImage,
                      alt: novel.title,
                      className: "w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }),
                  rank !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `absolute top-2 left-2 w-7 h-7 flex items-center justify-center rounded-full font-display font-black text-xs ${rank === 1 ? "bg-secondary text-secondary-foreground" : rank === 2 ? "bg-muted-foreground/80 text-foreground" : rank === 3 ? "bg-primary/80 text-primary-foreground" : "bg-black/60 text-white"}`,
                      children: rank
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex flex-col gap-1 items-end", children: [
                    novel.isHot && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-destructive/90 text-white", children: "🔥 HOT" }),
                    novel.isNew && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-accent/90 text-accent-foreground", children: "NEW" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-2.5 w-2.5 fill-secondary text-secondary" }),
                    novel.rating
                  ] }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${isSmall ? "p-2" : "p-3"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `font-display font-semibold leading-snug line-clamp-2 ${isSmall ? "text-xs" : "text-sm"}`,
                  children: novel.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-muted-foreground truncate mt-0.5 ${isSmall ? "text-[10px]" : "text-xs"}`,
                  children: novel.author
                }
              ),
              !isSmall && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 flex-wrap", children: [
                novel.genre.slice(0, 1).map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-[10px] px-1.5 py-0 border-primary/40 text-primary",
                    children: g
                  },
                  g
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-[10px] text-muted-foreground ml-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
                  formatCount$1(novel.views)
                ] })
              ] }),
              isLarge && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2 text-[10px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3" }),
                  novel.chapterCount,
                  " ch"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: novel.status })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function ProgressBar({
  value,
  max = 100,
  className = "",
  showLabel = false,
  size = "sm",
  color = "primary"
}) {
  const pct = Math.min(100, Math.max(0, value / max * 100));
  const heightClass = size === "sm" ? "h-1.5" : "h-2.5";
  const colorClass = color === "primary" ? "bg-primary" : color === "accent" ? "bg-accent" : "bg-secondary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `relative ${heightClass} bg-muted rounded-full overflow-hidden`,
        role: "progressbar",
        tabIndex: -1,
        "aria-valuenow": Math.round(pct),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute inset-y-0 left-0 ${colorClass} rounded-full transition-all duration-500 ease-out`,
            style: { width: `${pct}%` }
          }
        )
      }
    ),
    showLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1", children: [
      Math.round(pct),
      "%"
    ] })
  ] });
}
const RANK_STYLES = {
  1: {
    glow: "shadow-secondary/30 border-secondary/60",
    badge: "bg-secondary text-secondary-foreground",
    label: "#1 TRENDING"
  },
  2: {
    glow: "shadow-accent/20 border-accent/40",
    badge: "bg-accent/90 text-accent-foreground",
    label: "TOP PICK"
  },
  3: {
    glow: "shadow-primary/20 border-primary/40",
    badge: "bg-primary/80 text-primary-foreground",
    label: "MUST READ"
  },
  4: {
    glow: "shadow-primary/10 border-primary/30",
    badge: "bg-primary/60 text-primary-foreground",
    label: "MUST READ"
  },
  5: {
    glow: "shadow-muted",
    badge: "bg-muted-foreground/70 text-foreground",
    label: "TOP 5"
  }
};
function formatCount(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${Math.round(n / 1e3)}K`;
  return String(n);
}
function RankingCard({
  novel,
  isActive,
  onClick,
  dataOcid
}) {
  const styles = RANK_STYLES[novel.rank] ?? RANK_STYLES[5];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${isActive ? `${styles.glow} scale-[1.02] shadow-xl` : "border-border hover:border-primary/40 hover:shadow-lg"}`,
      onClick,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") onClick == null ? void 0 : onClick();
      },
      "data-ocid": dataOcid,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/novel/$id", params: { id: novel.id }, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3] bg-muted overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: novel.coverImage,
            alt: novel.title,
            className: "w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-[9px] font-bold px-2 py-0.5 rounded-full ${styles.badge}`,
            children: novel.badge || styles.label
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-black text-xs text-white bg-black/60 rounded px-1.5 py-0.5", children: [
          "#",
          novel.rank
        ] }) }),
        novel.rank === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-10 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-secondary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs font-bold text-white line-clamp-2 leading-tight", children: novel.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-white/70 truncate mt-0.5", children: [
            novel.author,
            " · ",
            novel.genre[0]
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-[9px] text-white/80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-2.5 w-2.5 fill-secondary text-secondary" }),
              novel.rating
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-[9px] text-white/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-2.5 w-2.5" }),
              formatCount(novel.views)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-[9px] text-white/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-2.5 w-2.5" }),
              novel.chapterCount,
              "ch"
            ] })
          ] })
        ] })
      ] }) })
    }
  );
}
const SITE_STATS = [
  {
    icon: BookText,
    label: "Total Novels",
    value: "12,400+",
    color: "text-primary"
  },
  {
    icon: Users,
    label: "Active Readers",
    value: "340K+",
    color: "text-accent"
  },
  {
    icon: BookOpen,
    label: "Read This Week",
    value: "86,200",
    color: "text-secondary"
  },
  {
    icon: Sparkles,
    label: "New Chapters Today",
    value: "1,820",
    color: "text-primary"
  }
];
const GENRES = [
  "All",
  "Fantasy",
  "Romance",
  "Sci-Fi",
  "Cyberpunk",
  "YA",
  "Thriller",
  "Mystery",
  "Historical"
];
function HeroSection() {
  const { data: topNovels, isLoading } = useTopNovels();
  const [active, setActive] = reactExports.useState(0);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", "data-ocid": "home.hero_loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-2xl mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-3", children: [1, 2, 3, 4, 5].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] rounded-xl" }, k)) })
    ] });
  }
  if (!(topNovels == null ? void 0 : topNovels.length)) return null;
  const featured = topNovels[active];
  const prev = () => setActive((a) => (a - 1 + topNovels.length) % topNovels.length);
  const next = () => setActive((a) => (a + 1) % topNovels.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", "data-ocid": "home.hero_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative rounded-2xl overflow-hidden mb-5 group",
        style: { minHeight: 220 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/novelhub-home-hero.dim_1400x500.jpg",
              alt: "NovelHub Hero",
              className: "w-full h-56 object-cover object-center opacity-50"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-center px-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-secondary text-xs", children: [
                "#",
                featured.rank,
                " THIS WEEK"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-accent text-xs", children: featured.genre[0] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-black text-foreground leading-tight max-w-md", children: featured.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1 max-w-sm", children: [
              "by ",
              featured.author
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 max-w-sm line-clamp-2", children: featured.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/novel/$id", params: { id: featured.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "button-primary gap-1.5",
                  "data-ocid": "home.hero_read_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                    "Start Reading"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/library", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-1.5",
                  "data-ocid": "home.hero_library_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "h-4 w-4" }),
                    "Browse All"
                  ]
                }
              ) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-secondary" }),
        "Top 5 Novels This Week"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "h-7 w-7",
            onClick: prev,
            "data-ocid": "home.hero_prev",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "h-7 w-7",
            onClick: next,
            "data-ocid": "home.hero_next",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 gap-3", children: topNovels.map((novel, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      RankingCard,
      {
        novel,
        isActive: i === active,
        onClick: () => setActive(i),
        dataOcid: `home.top_novel.${i + 1}`
      },
      novel.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 mt-3", children: topNovels.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActive(i),
        className: `h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-primary" : "w-1.5 bg-muted hover:bg-muted-foreground"}`,
        "aria-label": `Select novel ${i + 1}`
      },
      n.id
    )) })
  ] });
}
function StatsBar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "mb-10 grid grid-cols-2 sm:grid-cols-4 gap-3",
      "data-ocid": "home.stats_section",
      children: SITE_STATS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "card-elevated p-4 flex items-center gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `h-5 w-5 ${s.color}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base leading-none", children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 leading-snug", children: s.label })
            ] })
          ]
        },
        s.label
      ))
    }
  );
}
function ContinueReadingSection({ isLoggedIn }) {
  const { principal } = useAuth();
  const { data: history, isLoading } = useReadingHistory(
    principal ?? void 0
  );
  const scrollRef = reactExports.useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current)
      scrollRef.current.scrollLeft += dir === "left" ? -260 : 260;
  };
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "mb-10 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-accent/10 border border-border p-6 flex flex-col sm:flex-row items-center gap-4",
        "data-ocid": "home.guest_cta_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold mb-1", children: "Start Your Reading Journey" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign in to track your reading progress, connect with friends, and get personalized recommendations." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "button-primary gap-2",
                "data-ocid": "home.guest_login_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
                  "Sign In"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/library", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "gap-2",
                "data-ocid": "home.guest_browse_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "h-4 w-4" }),
                  "Browse Free"
                ]
              }
            ) })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", "data-ocid": "home.continue_reading_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-accent" }),
        "Continue Reading"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "h-7 w-7",
            onClick: () => scroll("left"),
            "data-ocid": "home.continue_prev",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "h-7 w-7",
            onClick: () => scroll("right"),
            "data-ocid": "home.continue_next",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
          }
        )
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 w-40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] rounded-lg mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4 mb-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-full" })
    ] }, k)) }) : history && history.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: scrollRef,
        className: "flex gap-4 overflow-x-auto scrollbar-none pb-2",
        children: history.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/novel/$id",
            params: { id: item.novelId },
            className: "shrink-0 w-40 group",
            "data-ocid": `home.continue_reading.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[2/3] bg-muted relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: item.novelCover,
                    alt: item.novelTitle,
                    className: "w-full h-full object-cover object-top"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded-full font-medium", children: [
                  "Ch. ",
                  item.chapterNumber,
                  "/",
                  item.totalChapters
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold line-clamp-2 leading-snug mb-2", children: item.novelTitle }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ProgressBar,
                  {
                    value: item.progressPercent,
                    showLabel: true,
                    size: "sm",
                    color: "primary"
                  }
                )
              ] })
            ] })
          },
          item.novelId
        ))
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-10 text-muted-foreground rounded-xl border border-dashed border-border",
        "data-ocid": "home.continue_reading.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No reading history yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1 opacity-70", children: "Start reading to track your progress here" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/library", className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              "data-ocid": "home.continue_reading.browse_button",
              children: "Explore Library"
            }
          ) })
        ]
      }
    )
  ] });
}
function TrendingSection() {
  const [activeGenre, setActiveGenre] = reactExports.useState("All");
  const { data: allNovels, isLoading } = useNovels();
  const filtered = allNovels && activeGenre !== "All" ? allNovels.filter((n) => n.genre.includes(activeGenre)) : allNovels ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", "data-ocid": "home.trending_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5 text-destructive" }),
        "Trending Now"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/library",
          className: "text-xs text-primary hover:underline",
          "data-ocid": "home.view_all_link",
          children: "View all →"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-5", children: GENRES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveGenre(g),
        className: `shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${g === activeGenre ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "bg-muted text-muted-foreground hover:bg-muted-foreground/20"}`,
        "data-ocid": `home.genre_tab.${g.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
        children: g
      },
      g
    )) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3", children: [1, 2, 3, 4, 5, 6].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] rounded-xl" }, k)) }) : filtered.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3", children: filtered.map((novel, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      NovelCard,
      {
        novel,
        size: "sm",
        dataOcid: `home.trending_novel.${i + 1}`
      },
      novel.id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center py-12 text-muted-foreground",
        "data-ocid": "home.trending.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No novels in this genre yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveGenre("All"),
              className: "mt-2 text-xs text-primary hover:underline",
              children: "Show all genres"
            }
          )
        ]
      }
    )
  ] });
}
function NewArrivalsSection() {
  const { data: allNovels } = useNovels();
  const newNovels = (allNovels == null ? void 0 : allNovels.filter((n) => n.isNew)) ?? [];
  if (!newNovels.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", "data-ocid": "home.new_arrivals_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-accent" }),
      "New Arrivals",
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "outline",
          className: "ml-1 border-accent/40 text-accent text-[10px] px-1.5",
          children: [
            newNovels.length,
            " new"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto scrollbar-none pb-2", children: newNovels.map((novel, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      NovelCard,
      {
        novel,
        size: "sm",
        dataOcid: `home.new_arrival.${i + 1}`
      }
    ) }, novel.id)) })
  ] });
}
function HomePage() {
  const { isAuthenticated } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ContinueReadingSection, { isLoggedIn: isAuthenticated }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewArrivalsSection, {})
  ] });
}
export {
  HomePage as default
};
