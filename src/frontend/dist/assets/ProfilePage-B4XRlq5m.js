import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, C as Clock, d as Button, B as BookOpen, x as shimExports, r as reactExports, y as useCallbackRef, z as useLayoutEffect2, p as cn, u as useAuth, g as useReadingHistory, M as MOCK_USERS, e as Library, I as Input, U as Users, T as TrendingUp, n as BookMarked, S as Star, b as Skeleton, A as ue } from "./index-S5JeUSL8.js";
import { B as Badge } from "./badge-BDYn-sE1.js";
import { c as createContextScope } from "./index-DR22_4ru.js";
import { P as Primitive } from "./index-CC8UjWnc.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-x02mUIBM.js";
import { L as Label } from "./label-BUN4A1ls.js";
import { S as Separator } from "./separator-CxukQ8-B.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-0PJpZZt6.js";
import { T as Textarea } from "./textarea-Ou8n6JuI.js";
import { F as Flame } from "./flame-gk2_-wdQ.js";
import "./index-mL3GD8CL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$1);
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
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode);
function formatLastRead(ts) {
  const diff = Date.now() - ts;
  const hours = Math.floor(diff / 36e5);
  const days = Math.floor(diff / 864e5);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}
function ReadingHistoryItem({
  item,
  author,
  genre,
  index
}) {
  const isCompleted = item.progressPercent >= 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated p-4 flex gap-4 hover:shadow-xl transition-smooth",
      "data-ocid": `profile.history_item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/novel/$id",
            params: { id: item.novelId },
            className: "shrink-0",
            "aria-label": `View ${item.novelTitle}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-24 rounded-lg overflow-hidden bg-muted border border-border shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.novelCover,
                alt: item.novelTitle,
                className: "w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/novel/$id",
                params: { id: item.novelId },
                className: "hover:text-primary transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm leading-snug line-clamp-1", children: item.novelTitle })
              }
            ),
            isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "shrink-0 gap-1 text-[10px] bg-accent/10 text-accent border-accent/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                  "Completed"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "shrink-0 text-[10px] text-primary border-primary/30",
                children: "In Progress"
              }
            )
          ] }),
          author && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: author }),
          genre && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-accent text-[10px] mt-0.5 inline-block", children: genre }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] text-muted-foreground mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Ch. ",
                item.chapterNumber,
                " / ",
                item.totalChapters
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground/80", children: [
                item.progressPercent,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-full rounded-full transition-all duration-500 ${isCompleted ? "bg-accent" : "bg-primary"}`,
                style: { width: `${Math.min(item.progressPercent, 100)}%` },
                role: "progressbar",
                tabIndex: -1,
                "aria-valuenow": item.progressPercent,
                "aria-valuemin": 0,
                "aria-valuemax": 100
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              formatLastRead(item.lastReadAt)
            ] }),
            !isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/novel/$id", params: { id: item.novelId }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-6 text-[10px] px-2 gap-1 text-primary border-primary/30 hover:bg-primary/10",
                "data-ocid": `profile.resume_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3" }),
                  "Resume"
                ]
              }
            ) }),
            isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/novel/$id", params: { id: item.novelId }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-6 text-[10px] px-2 gap-1 text-muted-foreground hover:text-foreground",
                "data-ocid": `profile.reread_button.${index}`,
                children: "Re-read"
              }
            ) })
          ] })
        ] })
      ]
    }
  );
}
function StatsCard({
  icon: Icon,
  label,
  value,
  sublabel,
  accent = "primary",
  "data-ocid": ocid
}) {
  const accentClass = {
    primary: "text-primary bg-primary/10 border-primary/20",
    secondary: "text-secondary bg-secondary/10 border-secondary/20",
    accent: "text-accent bg-accent/10 border-accent/20"
  }[accent];
  const iconBg = {
    primary: "bg-primary/15",
    secondary: "bg-secondary/15",
    accent: "bg-accent/15"
  }[accent];
  const iconText = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent"
  }[accent];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-xl border p-4 flex items-start gap-4 bg-card transition-smooth hover:shadow-lg ${accentClass}`,
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-lg p-2.5 shrink-0 ${iconBg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${iconText}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground leading-none", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground/80 mt-1", children: label }),
          sublabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sublabel })
        ] })
      ]
    }
  );
}
function useIsHydrated() {
  return shimExports.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}
var AVATAR_NAME = "Avatar";
var [createAvatarContext] = createContextScope(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = reactExports.useState("idle");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AvatarProvider,
      {
        scope: __scopeAvatar,
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...avatarProps, ref: forwardedRef })
      }
    );
  }
);
Avatar$1.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, src, onLoadingStatusChange = () => {
    }, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
    const handleLoadingStatusChange = useCallbackRef((status) => {
      onLoadingStatusChange(status);
      context.onImageLoadingStatusChange(status);
    });
    useLayoutEffect2(() => {
      if (imageLoadingStatus !== "idle") {
        handleLoadingStatusChange(imageLoadingStatus);
      }
    }, [imageLoadingStatus, handleLoadingStatusChange]);
    return imageLoadingStatus === "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.img, { ...imageProps, ref: forwardedRef, src }) : null;
  }
);
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = reactExports.useState(delayMs === void 0);
    reactExports.useEffect(() => {
      if (delayMs !== void 0) {
        const timerId = window.setTimeout(() => setCanRender(true), delayMs);
        return () => window.clearTimeout(timerId);
      }
    }, [delayMs]);
    return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...fallbackProps, ref: forwardedRef }) : null;
  }
);
AvatarFallback$1.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
  if (!image) {
    return "idle";
  }
  if (!src) {
    return "error";
  }
  if (image.src !== src) {
    image.src = src;
  }
  return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
  const isHydrated = useIsHydrated();
  const imageRef = reactExports.useRef(null);
  const image = (() => {
    if (!isHydrated) return null;
    if (!imageRef.current) {
      imageRef.current = new window.Image();
    }
    return imageRef.current;
  })();
  const [loadingStatus, setLoadingStatus] = reactExports.useState(
    () => resolveLoadingStatus(image, src)
  );
  useLayoutEffect2(() => {
    setLoadingStatus(resolveLoadingStatus(image, src));
  }, [image, src]);
  useLayoutEffect2(() => {
    const updateStatus = (status) => () => {
      setLoadingStatus(status);
    };
    if (!image) return;
    const handleLoad = updateStatus("loaded");
    const handleError = updateStatus("error");
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (typeof crossOrigin === "string") {
      image.crossOrigin = crossOrigin;
    }
    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [image, crossOrigin, referrerPolicy]);
  return loadingStatus;
}
var Root = Avatar$1;
var Fallback = AvatarFallback$1;
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function EditProfileModal({
  profile,
  open,
  onClose,
  onSave
}) {
  const [displayName, setDisplayName] = reactExports.useState(profile.displayName);
  const [username, setUsername] = reactExports.useState(profile.username);
  const [bio, setBio] = reactExports.useState(profile.bio);
  const [avatarUrl, setAvatarUrl] = reactExports.useState("");
  function handleSave() {
    if (!displayName.trim() || !username.trim()) {
      ue.error("Name and username are required.");
      return;
    }
    onSave({
      displayName,
      username,
      bio,
      ...avatarUrl.trim() ? { avatar: avatarUrl.trim() } : {}
    });
    ue.success("Profile updated!");
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "profile.edit_dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Edit Profile" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-16 w-16 rounded-2xl border-2 border-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "rounded-2xl bg-primary font-display text-xl font-bold text-primary-foreground", children: profile.avatar }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "avatarUrl",
              className: "text-xs text-muted-foreground",
              children: "Avatar URL (optional)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "avatarUrl",
              placeholder: "https://example.com/avatar.jpg",
              value: avatarUrl,
              onChange: (e) => setAvatarUrl(e.target.value),
              "data-ocid": "profile.avatar_url_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "displayName", children: "Display Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "displayName",
            value: displayName,
            onChange: (e) => setDisplayName(e.target.value),
            "data-ocid": "profile.display_name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "username", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "username",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            "data-ocid": "profile.username_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bio", children: "Bio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "bio",
            rows: 3,
            placeholder: "Tell the world about yourself...",
            value: bio,
            onChange: (e) => setBio(e.target.value),
            "data-ocid": "profile.bio_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "profile.edit_cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleSave,
            "data-ocid": "profile.edit_save_button",
            children: "Save Changes"
          }
        )
      ] })
    ] })
  ] }) });
}
function ProfileHeader({ profile, onEditOpen }) {
  const joined = new Date(profile.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated mb-6 overflow-hidden",
      "data-ocid": "profile.header",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-32 w-full relative",
            style: {
              background: "linear-gradient(135deg, oklch(0.25 0.12 260), oklch(0.20 0.10 180), oklch(0.22 0.08 55))"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 opacity-20",
                style: {
                  backgroundImage: "radial-gradient(circle at 20% 50%, oklch(0.6 0.28 260 / 0.5) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.7 0.18 55 / 0.4) 0%, transparent 40%)"
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between -mt-10 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-20 w-20 rounded-2xl border-4 border-card shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "rounded-2xl bg-primary font-display text-2xl font-bold text-primary-foreground", children: profile.avatar }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  className: "gap-1.5",
                  onClick: onEditOpen,
                  "data-ocid": "profile.edit_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3.5 w-3.5" }),
                    " Edit Profile"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  "aria-label": "Settings",
                  "data-ocid": "profile.settings_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold leading-tight", children: profile.displayName }),
              profile.isOnline && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] text-accent font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-accent animate-pulse" }),
                " ",
                "Online"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "@",
              profile.username
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-2 text-foreground/90 max-w-lg", children: profile.bio }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
              "Member since ",
              joined
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
            {
              icon: BookOpen,
              label: "Novels Read",
              value: profile.readingCount
            },
            { icon: PenLine, label: "Written", value: profile.writingCount },
            { icon: Users, label: "Friends", value: profile.friendCount }
          ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center rounded-lg bg-muted/40 p-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4 mx-auto mb-1 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg leading-none", children: s.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: s.label })
              ]
            },
            s.label
          )) })
        ] })
      ]
    }
  );
}
function ReadingStats({
  totalNovels,
  totalChapters,
  favoriteGenre,
  streak
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6", "data-ocid": "profile.stats_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-secondary" }),
      " Reading Stats"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatsCard,
        {
          icon: BookMarked,
          label: "Novels Read",
          value: totalNovels,
          accent: "primary",
          "data-ocid": "profile.stats_novels"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatsCard,
        {
          icon: Library,
          label: "Chapters Read",
          value: totalChapters,
          sublabel: "across all novels",
          accent: "accent",
          "data-ocid": "profile.stats_chapters"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatsCard,
        {
          icon: Star,
          label: "Favorite Genre",
          value: favoriteGenre,
          accent: "secondary",
          "data-ocid": "profile.stats_genre"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatsCard,
        {
          icon: Flame,
          label: "Reading Streak",
          value: `${streak} days`,
          sublabel: "Keep it up!",
          accent: "primary",
          "data-ocid": "profile.stats_streak"
        }
      )
    ] })
  ] });
}
const NOVEL_META = {
  "1": { author: "Sarah J. Maas", genre: "Fantasy" },
  "2": { author: "Cassandra Clare", genre: "Fantasy" },
  "3": { author: "Tahereh Mafi", genre: "Dystopian" },
  "4": { author: "Leigh Bardugo", genre: "Fantasy" },
  "5": { author: "Marcus Cole", genre: "Romance" }
};
function HistorySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 flex gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-24 rounded-lg shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-full rounded-full mt-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/4" })
    ] })
  ] }, k)) });
}
function EmptyHistory({
  icon: Icon,
  message,
  sub,
  ocid,
  cta
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-16 text-center",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 text-muted-foreground opacity-50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-base mb-1", children: message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: sub }),
        cta && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "gap-2",
            "data-ocid": "profile.browse_novels_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
              " Browse Novels"
            ]
          }
        ) })
      ]
    }
  );
}
function ProfilePage() {
  const { isAuthenticated, principal } = useAuth();
  const { data: history, isLoading: histLoading } = useReadingHistory(
    principal ?? void 0
  );
  const [profileData, setProfileData] = reactExports.useState(MOCK_USERS[0]);
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const inProgress = (history ?? []).filter((h) => h.progressPercent < 100);
  const completed = (history ?? []).filter((h) => h.progressPercent >= 100);
  const totalChapters = (history ?? []).reduce(
    (sum, h) => sum + h.chapterNumber,
    0
  );
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-center",
        "data-ocid": "profile.auth_gate",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 text-primary opacity-70" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Sign in to view your Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-xs", children: "Track your reading progress, manage your library, and connect with friends." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", "data-ocid": "profile.login_button", children: "Sign In" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditProfileModal,
      {
        profile: profileData,
        open: editOpen,
        onClose: () => setEditOpen(false),
        onSave: (updates) => setProfileData((prev) => ({ ...prev, ...updates }))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProfileHeader,
      {
        profile: profileData,
        onEditOpen: () => setEditOpen(true)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReadingStats,
      {
        totalNovels: profileData.readingCount,
        totalChapters,
        favoriteGenre: "Fantasy",
        streak: 7
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "current", "data-ocid": "profile.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted mb-4 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "current", "data-ocid": "profile.tab_current", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5 mr-1.5" }),
          "Currently Reading",
          inProgress.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "ml-1.5 h-4 px-1.5 text-[10px] bg-primary/20 text-primary",
              children: inProgress.length
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "completed", "data-ocid": "profile.tab_completed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 mr-1.5" }),
          "Completed",
          completed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "ml-1.5 h-4 px-1.5 text-[10px] bg-accent/20 text-accent",
              children: completed.length
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", "data-ocid": "profile.tab_all", children: "All History" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "current", children: histLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(HistorySkeleton, {}) : inProgress.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyHistory,
        {
          icon: BookOpen,
          message: "No novels in progress",
          sub: "Browse the library to find your next adventure.",
          ocid: "profile.current_empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: inProgress.map((item, i) => {
        var _a, _b;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReadingHistoryItem,
          {
            item,
            index: i + 1,
            author: (_a = NOVEL_META[item.novelId]) == null ? void 0 : _a.author,
            genre: (_b = NOVEL_META[item.novelId]) == null ? void 0 : _b.genre
          },
          item.novelId
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "completed", children: histLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(HistorySkeleton, {}) : completed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyHistory,
        {
          icon: CircleCheck,
          message: "No completed novels yet",
          sub: "Finish a novel to see it here.",
          ocid: "profile.completed_empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: completed.map((item, i) => {
        var _a, _b;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReadingHistoryItem,
          {
            item,
            index: i + 1,
            author: (_a = NOVEL_META[item.novelId]) == null ? void 0 : _a.author,
            genre: (_b = NOVEL_META[item.novelId]) == null ? void 0 : _b.genre
          },
          item.novelId
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", children: histLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(HistorySkeleton, {}) : (history ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyHistory,
        {
          icon: Library,
          message: "No reading history yet",
          sub: "Start reading to track your progress here.",
          ocid: "profile.all_empty_state",
          cta: true
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (history ?? []).map((item, i) => {
        var _a, _b;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReadingHistoryItem,
          {
            item,
            index: i + 1,
            author: (_a = NOVEL_META[item.novelId]) == null ? void 0 : _a.author,
            genre: (_b = NOVEL_META[item.novelId]) == null ? void 0 : _b.genre
          },
          item.novelId
        );
      }) }) })
    ] })
  ] });
}
export {
  ProfilePage as default
};
