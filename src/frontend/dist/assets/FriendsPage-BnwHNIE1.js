import { c as createLucideIcon, j as jsxRuntimeExports, B as BookOpen, e as Library, n as BookMarked, r as reactExports, C as Clock, d as Button, L as Link, u as useAuth, o as useFriends, U as Users, i as Search, I as Input, b as Skeleton, M as MOCK_USERS } from "./index-S5JeUSL8.js";
import { H as Heart } from "./heart-BivMy_4S.js";
import { B as Badge } from "./badge-BDYn-sE1.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-x02mUIBM.js";
import { U as UserMinus, a as UserPlus } from "./user-plus-HtZNCyOr.js";
import { S as Separator } from "./separator-CxukQ8-B.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-0PJpZZt6.js";
import "./index-mL3GD8CL.js";
import "./index-CC8UjWnc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
const ACTION_META = {
  reading: { label: "is reading", icon: BookOpen, color: "text-primary" },
  started: { label: "started", icon: BookMarked, color: "text-accent" },
  finished: { label: "finished", icon: CircleCheckBig, color: "text-green-500" },
  liked: { label: "liked", icon: Heart, color: "text-secondary" },
  added: {
    label: "added to library",
    icon: Library,
    color: "text-muted-foreground"
  }
};
function formatTime(ts) {
  const diff = Date.now() - ts;
  if (diff < 6e4) return "just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
const AVATAR_COLORS$2 = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary",
  "bg-accent/20 text-accent",
  "bg-[oklch(0.55_0.22_300)]/20 text-[oklch(0.75_0.22_300)]"
];
function avatarColor(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 4;
  return AVATAR_COLORS$2[h];
}
function buildActivityFromFriends(friends) {
  const items = [];
  const actions = [
    "reading",
    "started",
    "finished",
    "liked",
    "added"
  ];
  friends.forEach((f, fi) => {
    if (!f.currentlyReading) return;
    items.push({
      id: `act-${f.id}-0`,
      friendId: f.id,
      friendName: f.displayName,
      friendAvatar: f.avatar,
      action: actions[fi % actions.length],
      novelTitle: f.currentlyReading,
      novelCover: "/assets/generated/novelhub-hero.dim_1200x600.jpg",
      timestamp: f.lastActive
    });
  });
  return items.sort((a, b) => b.timestamp - a.timestamp);
}
function ActivityFeed({ friends }) {
  const activities = buildActivityFromFriends(friends);
  if (activities.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-10 text-muted-foreground",
        "data-ocid": "friends.activity_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 mb-3 opacity-25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No activity yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Activity will appear when friends start reading" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "friends.activity_feed", children: activities.map((item, i) => {
    const meta = ACTION_META[item.action];
    const Icon = meta.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated p-3 flex items-center gap-3",
        "data-ocid": `friends.activity_item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-9 w-9 rounded-full flex items-center justify-center font-display text-xs font-bold shrink-0 ${avatarColor(
                item.friendId
              )}`,
              children: item.friendAvatar
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-9 rounded overflow-hidden shrink-0 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.novelCover,
              alt: item.novelTitle,
              className: "h-full w-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: item.friendName }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${meta.color} font-medium`, children: meta.label }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: item.novelTitle })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-3 w-3 ${meta.color}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatTime(item.timestamp) })
            ] })
          ] })
        ]
      },
      item.id
    );
  }) });
}
const AVATAR_COLORS$1 = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary",
  "bg-accent/20 text-accent",
  "bg-[oklch(0.55_0.22_300)]/20 text-[oklch(0.75_0.22_300)]",
  "bg-[oklch(0.55_0.22_20)]/20 text-[oklch(0.75_0.22_20)]"
];
function getAvatarColor$1(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % AVATAR_COLORS$1.length;
  }
  return AVATAR_COLORS$1[hash % AVATAR_COLORS$1.length];
}
function formatLastSeen(ts) {
  const diff = Date.now() - ts;
  if (diff < 6e4) return "just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
function FriendCard({ friend, index, onRemove }) {
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const avatarColor2 = getAvatarColor$1(friend.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated p-4 flex items-center gap-4 group",
        "data-ocid": `friends.item.${index}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-12 w-12 rounded-full flex items-center justify-center font-display text-base font-bold ${avatarColor2}`,
                children: friend.avatar
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card ${friend.isOnline ? "bg-green-500" : "bg-muted"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: friend.displayName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "@",
                friend.username
              ] })
            ] }),
            friend.currentlyReading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground truncate", children: [
                "Currently reading:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: friend.currentlyReading })
              ] })
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mt-0.5", children: friend.isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "h-4 px-1.5 text-[10px] bg-green-500/15 text-green-400 border-green-500/30", children: "Online" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatLastSeen(friend.lastActive) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-smooth", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8",
                "aria-label": "Message",
                "data-ocid": `friends.message_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "text-xs h-8",
                "data-ocid": `friends.profile_button.${index}`,
                children: "View"
              }
            ) }),
            onRemove && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-destructive hover:bg-destructive/10",
                "aria-label": "Remove friend",
                "data-ocid": `friends.delete_button.${index}`,
                onClick: () => setShowConfirm(true),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { className: "h-4 w-4" })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showConfirm, onOpenChange: setShowConfirm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": `friends.dialog.${index}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Remove Friend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Remove",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: friend.displayName }),
          " ",
          "from your friends list? They won't be notified."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setShowConfirm(false),
            "data-ocid": `friends.cancel_button.${index}`,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            onClick: () => {
              onRemove == null ? void 0 : onRemove(friend.id);
              setShowConfirm(false);
            },
            "data-ocid": `friends.confirm_button.${index}`,
            children: "Remove"
          }
        )
      ] })
    ] }) })
  ] });
}
const FRIEND_REQUESTS = [
  {
    id: "r1",
    from: "nova_reader",
    displayName: "Nova R.",
    avatar: "NR",
    mutualFriends: 3
  },
  {
    id: "r2",
    from: "eli_writes",
    displayName: "Eli W.",
    avatar: "EW",
    mutualFriends: 1
  }
];
const DISCOVER_USERS = [
  {
    id: "d1",
    username: "priya_reads",
    displayName: "Priya S.",
    avatar: "PS",
    mutualFriends: 5
  },
  {
    id: "d2",
    username: "luca_m",
    displayName: "Luca M.",
    avatar: "LM",
    mutualFriends: 2
  },
  {
    id: "d3",
    username: "yuki_writes",
    displayName: "Yuki W.",
    avatar: "YW",
    mutualFriends: 4
  },
  {
    id: "d4",
    username: "sam_lit",
    displayName: "Sam L.",
    avatar: "SL",
    mutualFriends: 1
  },
  {
    id: "d5",
    username: "fen_books",
    displayName: "Fen B.",
    avatar: "FB",
    mutualFriends: 6
  }
];
const AVATAR_COLORS = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary",
  "bg-accent/20 text-accent",
  "bg-[oklch(0.55_0.22_300)]/20 text-[oklch(0.75_0.22_300)]",
  "bg-[oklch(0.55_0.22_20)]/20 text-[oklch(0.75_0.22_20)]"
];
function getAvatarColor(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++)
    h = (h * 31 + id.charCodeAt(i)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function FriendListSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "friends.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12 rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-52" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16 rounded-md" })
  ] }, i)) });
}
function PendingRequestsSection() {
  const [requests, setRequests] = reactExports.useState(FRIEND_REQUESTS);
  if (requests.length === 0) return null;
  const accept = (id) => setRequests((r) => r.filter((x) => x.id !== id));
  const decline = (id) => setRequests((r) => r.filter((x) => x.id !== id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", "data-ocid": "friends.pending_requests_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider", children: "Pending Requests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "h-4 px-1.5 text-[10px] bg-secondary/20 text-secondary border-secondary/30", children: requests.length })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: requests.map((req, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated p-4 flex items-center gap-4",
        "data-ocid": `friends.request.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-11 w-11 rounded-full flex items-center justify-center font-display text-sm font-bold shrink-0 ${getAvatarColor(req.id)}`,
              children: req.avatar
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: req.displayName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "@",
              req.from,
              " · ",
              req.mutualFriends,
              " mutual friends"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "gap-1 h-8 text-xs",
                onClick: () => accept(req.id),
                "data-ocid": `friends.accept_button.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5" }),
                  " Accept"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "gap-1 h-8 text-xs",
                onClick: () => decline(req.id),
                "data-ocid": `friends.decline_button.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
                  " Decline"
                ]
              }
            )
          ] })
        ]
      },
      req.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mt-6" })
  ] });
}
function AddFriendSection() {
  const [query, setQuery] = reactExports.useState("");
  const [sent, setSent] = reactExports.useState(/* @__PURE__ */ new Set());
  const mockResults = query.trim() ? MOCK_USERS.filter(
    (u) => u.username.toLowerCase().includes(query.toLowerCase()) || u.displayName.toLowerCase().includes(query.toLowerCase())
  ).map((u) => ({ ...u, mutualFriends: 0 })) : [];
  const discoverFiltered = DISCOVER_USERS.filter(
    (u) => !query.trim() || u.username.toLowerCase().includes(query.toLowerCase()) || u.displayName.toLowerCase().includes(query.toLowerCase())
  );
  const combined = [...mockResults, ...discoverFiltered];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "friends.discover_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by username…",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          className: "pl-9",
          "data-ocid": "friends.add_search_input"
        }
      )
    ] }),
    combined.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center py-12 text-muted-foreground",
        "data-ocid": "friends.discover_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-12 w-12 mb-3 opacity-25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No users found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Try a different username" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: combined.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated p-4 flex items-center gap-4",
        "data-ocid": `friends.discover_user.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-11 w-11 rounded-full flex items-center justify-center font-display text-sm font-bold shrink-0 ${getAvatarColor(user.id)}`,
              children: user.avatar || user.displayName.slice(0, 2).toUpperCase()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: user.displayName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "@",
              user.username,
              user.mutualFriends > 0 ? ` · ${user.mutualFriends} mutual friends` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: sent.has(user.id) ? "outline" : "default",
              className: "gap-1.5 h-8 text-xs shrink-0",
              onClick: () => setSent((s) => /* @__PURE__ */ new Set([...s, user.id])),
              disabled: sent.has(user.id),
              "data-ocid": `friends.add_button.${i + 1}`,
              children: [
                sent.has(user.id) ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-3.5 w-3.5" }),
                sent.has(user.id) ? "Sent" : "Add Friend"
              ]
            }
          )
        ]
      },
      user.id
    )) })
  ] });
}
function FriendsPage() {
  const { principal, isAuthenticated } = useAuth();
  const { data: friends = [], isLoading } = useFriends(principal ?? void 0);
  const [search, setSearch] = reactExports.useState("");
  const [friendList, setFriendList] = reactExports.useState(null);
  const activeFriends = friendList ?? friends;
  const filtered = activeFriends.filter(
    (f) => f.displayName.toLowerCase().includes(search.toLowerCase()) || f.username.toLowerCase().includes(search.toLowerCase())
  );
  const onlineCount = activeFriends.filter((f) => f.isOnline).length;
  const handleRemove = (id) => {
    const base = friendList ?? friends;
    setFriendList(base.filter((f) => f.id !== id));
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24",
        "data-ocid": "friends.auth_gate",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-10 w-10 text-muted-foreground opacity-40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Join the Community" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 text-center max-w-xs", children: "Sign in to connect with fellow readers, see what your friends are reading, and share your journey." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "gap-2", "data-ocid": "friends.login_button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
            " Sign In to Continue"
          ] }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "friends.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold mb-1 flex items-center gap-2", children: [
        "Friends",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/20 text-primary border-primary/30 font-mono text-xs", children: activeFriends.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
        onlineCount,
        " online now · ",
        activeFriends.length - onlineCount,
        " ",
        "offline"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PendingRequestsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "all", "data-ocid": "friends.all_tab", children: [
          "My Friends",
          activeFriends.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1.5 h-4 px-1.5 text-[10px] bg-primary/20 text-primary border-primary/30", children: activeFriends.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "activity", "data-ocid": "friends.activity_tab", children: "Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "discover", "data-ocid": "friends.discover_tab", children: "Add Friends" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search friends…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "friends.search_input"
            }
          )
        ] }) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(FriendListSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 text-muted-foreground",
            "data-ocid": "friends.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8 opacity-30" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold", children: "No friends yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1 mb-5", children: "Start by adding people from the library!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/library", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "gap-2",
                  "data-ocid": "friends.go_library_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                    " Browse Library"
                  ]
                }
              ) })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((friend, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          FriendCard,
          {
            friend,
            index: i + 1,
            onRemove: handleRemove
          },
          friend.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "activity", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: "Friend Activity" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "space-y-2",
            "data-ocid": "friends.activity_loading_state",
            children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "card-elevated p-3 flex items-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-9 rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-9 rounded" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
                  ] })
                ]
              },
              i
            ))
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityFeed, { friends: activeFriends })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "discover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddFriendSection, {}) })
    ] })
  ] });
}
export {
  FriendsPage as default
};
