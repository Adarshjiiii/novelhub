import { c as createLucideIcon, j as jsxRuntimeExports, b as Skeleton, B as BookOpen, L as Link, C as Clock, d as Button, r as reactExports, S as Star, p as cn, q as useParams, s as useNovel, t as useChapters, v as MOCK_READING_HISTORY, U as Users, w as MOCK_NOVELS } from "./index-S5JeUSL8.js";
import { B as Badge } from "./badge-BDYn-sE1.js";
import { C as ChevronRight } from "./chevron-right-D2GsC6BU.js";
import { c as createContextScope } from "./index-DR22_4ru.js";
import { P as Primitive } from "./index-CC8UjWnc.js";
import { S as Separator } from "./separator-CxukQ8-B.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-0PJpZZt6.js";
import { A as ArrowLeft } from "./arrow-left-y2RRM2sg.js";
import { E as Eye } from "./eye-BR5d8HU-.js";
import { H as Heart } from "./heart-BivMy_4S.js";
import { C as ChevronDown } from "./chevron-down-WRZvhiEL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("bookmark", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
function formatWordCount(wc) {
  if (wc >= 1e3) return `${(wc / 1e3).toFixed(1)}K words`;
  return `${wc} words`;
}
function timeAgo(ts) {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / 864e5);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
function ChapterList({
  chapters,
  novelId,
  isLoading,
  progress
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "chapter_list.loading_state", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, i)) });
  }
  if (!chapters.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center py-10 text-muted-foreground",
        "data-ocid": "chapter_list.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No chapters available yet." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", "data-ocid": "chapter_list.list", children: chapters.map((ch, idx) => {
    const isRead = progress && progress.chapterNumber >= ch.chapterNumber;
    const isCurrent = progress && progress.chapterId === ch.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: [
          "group flex items-center justify-between px-3 py-2.5 rounded-lg transition-smooth",
          ch.isLocked ? "opacity-60 cursor-not-allowed" : "hover:bg-muted/60 cursor-pointer",
          isCurrent ? "bg-primary/10 border border-primary/30" : ""
        ].join(" "),
        "data-ocid": `chapter_list.item.${idx + 1}`,
        children: ch.isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-7 shrink-0 font-mono", children: [
            "#",
            ch.chapterNumber
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: ch.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              formatWordCount(ch.wordCount),
              " · ",
              timeAgo(ch.publishedAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/chapter/$novelId/$chapterId",
            params: { novelId, chapterId: ch.id },
            className: "flex items-center gap-3 flex-1 min-w-0",
            "data-ocid": `chapter_list.link.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: [
                    "text-xs w-7 shrink-0 font-mono",
                    isRead ? "text-primary" : "text-muted-foreground"
                  ].join(" "),
                  children: [
                    "#",
                    ch.chapterNumber
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: [
                        "text-sm font-medium truncate",
                        isRead ? "text-muted-foreground" : ""
                      ].join(" "),
                      children: ch.title
                    }
                  ),
                  isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "badge-accent text-xs py-0 shrink-0", children: "Current" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                  formatWordCount(ch.wordCount),
                  " · ",
                  timeAgo(ch.publishedAt)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth shrink-0" })
            ]
          }
        )
      },
      ch.id
    );
  }) });
}
function ResumeButton({ progress, novelId }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/chapter/$novelId/$chapterId",
      params: { novelId, chapterId: progress.chapterId },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "w-full gap-2 button-primary",
          "data-ocid": "chapter_list.resume_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
            "Resume Chapter ",
            progress.chapterNumber
          ]
        }
      )
    }
  );
}
function StarRating({
  rating,
  reviewCount,
  interactive = false,
  onRate,
  size = "md"
}) {
  const [hovered, setHovered] = reactExports.useState(0);
  const [selected, setSelected] = reactExports.useState(0);
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };
  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };
  const displayRating = interactive ? selected || rating : rating;
  const activeIndex = interactive ? hovered || selected || 0 : 0;
  function handleClick(n) {
    if (!interactive) return;
    setSelected(n);
    onRate == null ? void 0 : onRate(n);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-1.5",
      "data-ocid": "star_rating.container",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((n) => {
          const filled = interactive ? n <= activeIndex : n <= Math.round(displayRating);
          const partial = !interactive && n === Math.ceil(displayRating) && displayRating % 1 !== 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": interactive ? `Rate ${n} stars` : void 0,
              className: [
                sizeClasses[size],
                "relative transition-transform duration-150",
                interactive ? "cursor-pointer hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded-sm" : "cursor-default"
              ].join(" "),
              onMouseEnter: () => interactive && setHovered(n),
              onMouseLeave: () => interactive && setHovered(0),
              onClick: () => handleClick(n),
              onKeyDown: (e) => e.key === "Enter" && handleClick(n),
              "data-ocid": interactive ? `star_rating.star.${n}` : void 0,
              children: partial ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-block", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: `${sizeClasses[size]} text-muted-foreground/40`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute inset-0 overflow-hidden",
                    style: { width: `${displayRating % 1 * 100}%` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Star,
                      {
                        className: `${sizeClasses[size]} fill-secondary text-secondary`
                      }
                    )
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: [
                    sizeClasses[size],
                    filled ? "fill-secondary text-secondary" : "text-muted-foreground/40"
                  ].join(" ")
                }
              )
            },
            n
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-semibold font-display ${textSize[size]}`, children: displayRating.toFixed(1) }),
        reviewCount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-muted-foreground ${textSize[size]}`,
            children: `(${reviewCount.toLocaleString()})`
          }
        )
      ]
    }
  );
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const AUTHOR_BIOS = {
  "Marissa Meyer": "New York Times bestselling author known for the Lunar Chronicles series, a retelling of classic fairy tales set in a futuristic world. Her works blend science fiction and romance in unique ways.",
  "Elara Vance": "Dark fantasy author celebrated for intricate world-building and complex anti-heroes. Her Shadowrealm saga has captivated readers across 40 countries.",
  "Kai Thorne": "Cyberpunk visionary and former software engineer. His debut novel Neon Echoes became an instant phenomenon, praised for its technical authenticity and pulse-pounding narrative.",
  "Aria Finch": "Nature-inspired fantasy author and environmental activist. Her YA novels carry both lyrical prose and deeply human themes about belonging and identity.",
  "Marcus Cole": "Epic fantasy and historical romance author with a background in classical literature. His immortal heroes are beloved for their emotional depth and moral complexity."
};
function NovelDetailPage() {
  const { id } = useParams({ strict: false });
  const { data: novel, isLoading } = useNovel(id);
  const { data: chapters = [], isLoading: chaptersLoading } = useChapters(id);
  const [descExpanded, setDescExpanded] = reactExports.useState(false);
  const [userRating, setUserRating] = reactExports.useState(0);
  const progress = MOCK_READING_HISTORY.find((r) => r.novelId === id) ?? null;
  const progressPercent = progress ? Math.round(progress.chapterNumber / (chapters.length || 1) * 100) : 0;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "novel_detail.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-36 h-52 rounded-xl shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" })
        ] })
      ] })
    ] });
  }
  if (!novel) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-muted-foreground",
        "data-ocid": "novel_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-16 w-16 mb-4 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold mb-2", children: "Novel Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-4", children: "This novel doesn't exist or was removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "novel_detail.back_home_button", children: "Back to Home" }) })
        ]
      }
    );
  }
  const authorBio = AUTHOR_BIOS[novel.author] ?? `${novel.author} is a talented author whose works have captivated thousands of readers worldwide. Known for rich storytelling and immersive world-building.`;
  const descriptionLong = novel.description.length > 180;
  const displayDescription = descriptionLong && !descExpanded ? `${novel.description.slice(0, 180)}...` : novel.description;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "novel_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors",
        "data-ocid": "novel_detail.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Back to Home"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl overflow-hidden bg-card border border-border shadow-xl mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-52 md:h-64 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: novel.coverImage,
            alt: novel.title,
            className: "w-full h-full object-cover object-top"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/95" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: [
              "text-xs font-semibold uppercase tracking-wide",
              novel.status === "ongoing" ? "bg-accent/90 text-accent-foreground" : novel.status === "completed" ? "bg-primary/90 text-primary-foreground" : "bg-muted text-muted-foreground"
            ].join(" "),
            children: novel.status
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5 p-5 -mt-20 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 md:w-36 shrink-0 rounded-xl overflow-hidden border-4 border-card shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: novel.coverImage,
            alt: novel.title,
            className: "w-full h-full object-cover"
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0 pt-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-bold line-clamp-2 leading-tight", children: novel.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
              "by",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: novel.author })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              StarRating,
              {
                rating: novel.rating,
                reviewCount: novel.reviewCount,
                size: "md"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 mt-2", children: [
              novel.genre.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "badge-accent text-xs", children: g }, g)),
              novel.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs text-muted-foreground",
                  children: [
                    "#",
                    t
                  ]
                },
                t
              ))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                "aria-label": "Bookmark",
                "data-ocid": "novel_detail.bookmark_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                "aria-label": "Share",
                "data-ocid": "novel_detail.share_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: [
          {
            icon: Eye,
            label: "Reads",
            value: `${(novel.views / 1e3).toFixed(0)}K`,
            color: "text-accent"
          },
          {
            icon: Heart,
            label: "Likes",
            value: `${(novel.likes / 1e3).toFixed(0)}K`,
            color: "text-destructive"
          },
          {
            icon: BookOpen,
            label: "Chapters",
            value: novel.chapterCount.toString(),
            color: "text-primary"
          },
          {
            icon: Users,
            label: "Reviews",
            value: `${(novel.reviewCount / 1e3).toFixed(1)}K`,
            color: "text-secondary"
          }
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `h-4 w-4 mx-auto mb-1 ${s.color}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base", children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.label })
        ] }, s.label)) }),
        progress && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-elevated p-4 space-y-2",
            "data-ocid": "novel_detail.progress_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Your Progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "Ch. ",
                  progress.chapterNumber,
                  " / ",
                  progress.totalChapters,
                  " —",
                  " ",
                  progressPercent,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progressPercent, className: "h-2" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "chapters", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "chapters",
                "data-ocid": "novel_detail.chapters_tab",
                children: [
                  "Chapters (",
                  chapters.length || novel.chapterCount,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "about", "data-ocid": "novel_detail.about_tab", children: "About" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "reviews", "data-ocid": "novel_detail.reviews_tab", children: "Reviews" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "chapters", className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChapterList,
              {
                chapters,
                novelId: id,
                isLoading: chaptersLoading,
                progress
              }
            ),
            chapters.length < novel.chapterCount && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground mt-4", children: [
              "Showing ",
              chapters.length,
              " of ",
              novel.chapterCount,
              " chapters"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "about", className: "mt-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold mb-2", children: "Synopsis" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: displayDescription }),
              descriptionLong && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "flex items-center gap-1 text-xs text-primary mt-2 hover:underline",
                  onClick: () => setDescExpanded((x) => !x),
                  "data-ocid": "novel_detail.expand_desc_button",
                  children: descExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3" }),
                    " Show less"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" }),
                    " Read more"
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold mb-2", children: "Genres & Tags" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                novel.genre.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "badge-accent", children: g }, g)),
                novel.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-muted-foreground",
                    children: [
                      "#",
                      t
                    ]
                  },
                  t
                ))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "reviews", className: "mt-4 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "card-elevated p-4",
                "data-ocid": "novel_detail.rate_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-2", children: userRating ? "Your rating:" : "Rate this novel:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StarRating,
                    {
                      rating: userRating || novel.rating,
                      interactive: true,
                      onRate: setUserRating,
                      size: "lg"
                    }
                  ),
                  userRating > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Thanks for rating!" })
                ]
              }
            ),
            [
              {
                user: "Alex R.",
                rating: 5,
                text: "Absolutely gripping from start to finish! The world-building is extraordinary.",
                date: "2 days ago"
              },
              {
                user: "Maya T.",
                rating: 4,
                text: "Beautifully written with deep, complex characters. The pacing could be tighter but overall a must-read.",
                date: "1 week ago"
              },
              {
                user: "Ben L.",
                rating: 5,
                text: "One of the best novels I've read in years. The emotional depth is unmatched.",
                date: "2 weeks ago"
              }
            ].map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "card-elevated p-4",
                "data-ocid": `novel_detail.review.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0", children: r.user[0] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: r.user }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: r.date })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: r.rating, size: "sm" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: r.text })
                ]
              },
              r.user
            ))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        progress ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResumeButton, { progress, novelId: id }) : chapters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/chapter/$novelId/$chapterId",
            params: { novelId: id, chapterId: chapters[0].id },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full gap-2 button-primary",
                "data-ocid": "novel_detail.read_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                  " Start Reading"
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full gap-2",
            "data-ocid": "novel_detail.collab_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }),
              " Collaborate"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm mb-3", children: "Novel Info" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-sm", children: [
            { label: "Status", value: novel.status },
            { label: "Chapters", value: novel.chapterCount },
            {
              label: "Words",
              value: `${(novel.wordCount / 1e3).toFixed(0)}K`
            },
            { label: "Reviews", value: novel.reviewCount.toLocaleString() }
          ].map((info) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: info.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium capitalize", children: info.value })
          ] }, info.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-elevated p-4",
            "data-ocid": "novel_detail.author_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm mb-3", children: "About the Author" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-base font-bold shrink-0", children: novel.author.split(" ").map((p) => p[0]).join("") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: novel.author }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Author" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-4", children: authorBio }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-2", children: "More by this author" }),
              MOCK_NOVELS.filter((n) => n.id !== novel.id).slice(0, 2).map((related) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/novel/$id",
                  params: { id: related.id },
                  className: "flex items-center gap-2 p-1.5 rounded hover:bg-muted transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-10 rounded overflow-hidden shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: related.coverImage,
                        alt: related.title,
                        className: "w-full h-full object-cover"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium line-clamp-2", children: related.title })
                  ]
                },
                related.id
              ))
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  NovelDetailPage as default
};
