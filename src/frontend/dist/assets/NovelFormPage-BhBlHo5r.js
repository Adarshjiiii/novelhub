import { c as createLucideIcon, q as useParams, s as useNovel, $ as useNavigate, r as reactExports, j as jsxRuntimeExports, b as Skeleton, d as Button, I as Input, A as ue, X, a0 as useActor, i as Search, a1 as Principal, a2 as createActor } from "./index-S5JeUSL8.js";
import { B as Badge } from "./badge-BDYn-sE1.js";
import { C as Card, a as CardHeader, d as CardTitle, b as CardContent } from "./card-Ct53rAn-.js";
import { L as Label } from "./label-BUN4A1ls.js";
import { T as Textarea } from "./textarea-Ou8n6JuI.js";
import { c as useCreateNovel, d as useUpdateNovel, e as useAddCoAuthor, f as useRemoveCoAuthor } from "./useAuthor-Dsu2eX6L.js";
import { A as ArrowLeft } from "./arrow-left-y2RRM2sg.js";
import { S as Save } from "./save-BDHlakfy.js";
import { U as UserMinus, a as UserPlus } from "./user-plus-HtZNCyOr.js";
import "./index-CC8UjWnc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17", key: "q6ojf0" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["circle", { cx: "10", cy: "8", r: "2", key: "2qkj4p" }]
];
const BookImage = createLucideIcon("book-image", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const GENRES = [
  "Fantasy",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Mystery",
  "Drama"
];
function CoverUpload({ value, onChange, disabled }) {
  const fileRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      ue.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      ue.error("Image must be under 5 MB");
      return;
    }
    setUploading(true);
    setProgress(0);
    const reader = new FileReader();
    reader.onprogress = (e) => {
      if (e.lengthComputable)
        setProgress(Math.round(e.loaded / e.total * 100));
    };
    reader.onload = () => {
      onChange(reader.result);
      setUploading(false);
      setProgress(100);
    };
    reader.onerror = () => {
      ue.error("Failed to read image");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 transition-colors hover:border-accent/60 hover:bg-muted/30 cursor-pointer w-full",
        style: { minHeight: "160px" },
        onClick: () => {
          var _a;
          return !disabled && ((_a = fileRef.current) == null ? void 0 : _a.click());
        },
        onDragOver: (e) => e.preventDefault(),
        onDrop: handleDrop,
        disabled,
        "data-ocid": "novel-form.cover_dropzone",
        children: value ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: value,
              alt: "Cover preview",
              className: "h-40 w-28 object-cover rounded-md shadow-md"
            }
          ),
          !disabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                onChange("");
              },
              className: "absolute top-2 right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs hover:opacity-90",
              "aria-label": "Remove cover image",
              "data-ocid": "novel-form.cover_remove_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-2 py-8 text-center", children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 text-accent animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Uploading… ",
            progress,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-1.5 rounded-full bg-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full bg-accent transition-all duration-300",
              style: { width: `${progress}%` }
            }
          ) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookImage, { className: "h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Click or drag to upload cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "PNG, JPG, WebP — max 5 MB" })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        disabled,
        onChange: (e) => {
          var _a;
          const f = (_a = e.target.files) == null ? void 0 : _a[0];
          if (f) handleFile(f);
        },
        "data-ocid": "novel-form.cover_upload_button"
      }
    )
  ] });
}
function CoAuthorPanel({ novelId, coAuthors }) {
  const { actor } = useActor(createActor);
  const addCoAuthor = useAddCoAuthor();
  const removeCoAuthor = useRemoveCoAuthor();
  const [query, setQuery] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [searching, setSearching] = reactExports.useState(false);
  const debounceRef = reactExports.useRef(null);
  const search = reactExports.useCallback(
    (term) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (!term.trim() || term.length < 2) {
        setResults([]);
        return;
      }
      debounceRef.current = setTimeout(async () => {
        if (!actor) return;
        setSearching(true);
        try {
          const res = await actor.searchUsers(term);
          setResults(res);
        } catch {
          ue.error("Failed to search users");
        } finally {
          setSearching(false);
        }
      }, 350);
    },
    [actor]
  );
  const handleAdd = async (user) => {
    const principal = user.id;
    if (coAuthors.includes(principal.toString())) {
      ue.info("Already a co-author");
      return;
    }
    try {
      await addCoAuthor.mutateAsync({ novelId, coAuthor: principal });
      ue.success(`Added ${user.username} as co-author`);
      setQuery("");
      setResults([]);
    } catch {
      ue.error("Failed to add co-author");
    }
  };
  const handleRemove = async (principalText) => {
    try {
      await removeCoAuthor.mutateAsync({
        novelId,
        coAuthor: Principal.fromText(principalText)
      });
      ue.success("Co-author removed");
    } catch {
      ue.error("Failed to remove co-author");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "novel-form.coauthor_panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-sm text-foreground", children: "Co-Authors" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        coAuthors.length,
        " added"
      ] })
    ] }),
    coAuthors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-wrap gap-2",
        "data-ocid": "novel-form.coauthor_list",
        children: coAuthors.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "secondary",
            className: "flex items-center gap-1.5 pr-1",
            "data-ocid": `novel-form.coauthor_chip.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate max-w-[120px] text-xs font-mono", children: [
                p.slice(0, 8),
                "…",
                p.slice(-4)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleRemove(p),
                  className: "h-4 w-4 rounded-full hover:bg-destructive/20 flex items-center justify-center transition-colors",
                  "aria-label": "Remove co-author",
                  "data-ocid": `novel-form.coauthor_remove_button.${i + 1}`,
                  disabled: removeCoAuthor.isPending,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { className: "h-2.5 w-2.5" })
                }
              )
            ]
          },
          p
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by username…",
          value: query,
          onChange: (e) => {
            setQuery(e.target.value);
            search(e.target.value);
          },
          className: "pl-9",
          "data-ocid": "novel-form.coauthor_search_input"
        }
      ),
      searching && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground animate-spin" })
    ] }),
    results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-md border border-border bg-card shadow-sm divide-y divide-border",
        "data-ocid": "novel-form.coauthor_results",
        children: results.slice(0, 5).map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-3 py-2 hover:bg-muted/30 transition-colors",
            "data-ocid": `novel-form.coauthor_result.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                user.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: user.avatarUrl,
                    alt: user.username,
                    className: "h-7 w-7 rounded-full object-cover shrink-0"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: user.username.charAt(0).toUpperCase() }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: user.username }),
                  user.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: user.bio })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "ghost",
                  className: "shrink-0 text-accent hover:text-accent hover:bg-accent/10",
                  onClick: () => handleAdd(user),
                  disabled: addCoAuthor.isPending || coAuthors.includes(user.id.toString()),
                  "data-ocid": `novel-form.coauthor_add_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-3.5 w-3.5 mr-1" }),
                    "Add"
                  ]
                }
              )
            ]
          },
          user.id.toString()
        ))
      }
    )
  ] });
}
const EMPTY = {
  title: "",
  description: "",
  genre: "Fantasy",
  tags: "",
  coverImage: ""
};
function validate(form) {
  const errors = {};
  if (!form.title.trim()) errors.title = "Title is required";
  if (form.title.trim().length > 200)
    errors.title = "Title must be 200 characters or fewer";
  if (!form.genre) errors.genre = "Genre is required";
  return errors;
}
function NovelFormPage() {
  const params = useParams({ strict: false });
  const novelId = params.id ? BigInt(params.id) : null;
  const isEdit = novelId !== null;
  const { data: existing, isLoading: loadingExisting } = useNovel(
    params.id ?? ""
  );
  const createNovel = useCreateNovel();
  const updateNovel = useUpdateNovel();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState(EMPTY);
  const [errors, setErrors] = reactExports.useState({});
  const [apiError, setApiError] = reactExports.useState(null);
  const [touched, setTouched] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (existing && isEdit) {
      setForm({
        title: existing.title,
        description: existing.description,
        genre: (Array.isArray(existing.genre) ? existing.genre[0] : existing.genre) ?? "Fantasy",
        tags: existing.tags.join(", "),
        coverImage: existing.coverImage ?? ""
      });
    }
  }, [existing, isEdit]);
  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (touched[key]) {
      const errs = validate({ ...form, [key]: e.target.value });
      setErrors((prev) => ({
        ...prev,
        [key]: errs[key]
      }));
    }
  };
  const handleBlur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validate(form)[key] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ title: true, genre: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setApiError(null);
    const req = {
      title: form.title.trim(),
      description: form.description.trim(),
      genre: form.genre,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      coverImage: form.coverImage
    };
    try {
      if (isEdit && novelId !== null) {
        await updateNovel.mutateAsync({ novelId, req });
        ue.success("Novel updated successfully");
        navigate({ to: "/author-dashboard" });
      } else {
        const id = await createNovel.mutateAsync({ req, authorName: "" });
        ue.success("Novel created!");
        navigate({
          to: "/author/novel/$id/edit",
          params: { id: id.toString() }
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setApiError(msg);
      ue.error(isEdit ? "Failed to update novel" : "Failed to create novel");
    }
  };
  const isPending = createNovel.isPending || updateNovel.isPending;
  if (isEdit && loadingExisting) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-8 space-y-4",
        "data-ocid": "novel-form.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", "data-ocid": "novel-form.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "sm",
        onClick: () => navigate({ to: "/author-dashboard" }),
        className: "mb-6 -ml-2 text-muted-foreground hover:text-foreground",
        "data-ocid": "novel-form.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
          "Back to Dashboard"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-xl", children: isEdit ? "Edit Novel" : "Create New Novel" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", noValidate: true, children: [
          apiError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive",
              "data-ocid": "novel-form.error_state",
              children: apiError
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "nf-title", children: [
              "Title ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "nf-title",
                value: form.title,
                onChange: setField("title"),
                onBlur: handleBlur("title"),
                placeholder: "Enter your novel's title",
                maxLength: 200,
                "data-ocid": "novel-form.title_input",
                "aria-invalid": !!errors.title,
                "aria-describedby": errors.title ? "nf-title-err" : void 0
              }
            ),
            errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                id: "nf-title-err",
                className: "text-xs text-destructive",
                "data-ocid": "novel-form.title.field_error",
                children: errors.title
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "nf-genre", children: [
              "Genre ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "nf-genre",
                value: form.genre,
                onChange: setField("genre"),
                onBlur: handleBlur("genre"),
                className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                "data-ocid": "novel-form.genre_select",
                "aria-invalid": !!errors.genre,
                children: GENRES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: g, children: g }, g))
              }
            ),
            errors.genre && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "novel-form.genre.field_error",
                children: errors.genre
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "nf-desc", children: [
              "Description",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "nf-desc",
                value: form.description,
                onChange: setField("description"),
                placeholder: "What is your novel about? Entice readers with a compelling summary…",
                rows: 4,
                "data-ocid": "novel-form.description_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "nf-tags", children: [
              "Tags",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(comma-separated)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "nf-tags",
                value: form.tags,
                onChange: setField("tags"),
                placeholder: "magic, dragons, epic adventure",
                "data-ocid": "novel-form.tags_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cover Image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CoverUpload,
              {
                value: form.coverImage,
                onChange: (url) => setForm((f) => ({ ...f, coverImage: url })),
                disabled: isPending
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                onClick: () => navigate({ to: "/author-dashboard" }),
                disabled: isPending,
                "data-ocid": "novel-form.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: isPending,
                className: "bg-accent text-accent-foreground hover:bg-accent/90",
                "data-ocid": "novel-form.submit_button",
                children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                  "Saving…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
                  isEdit ? "Save Changes" : "Create Novel"
                ] })
              }
            )
          ] })
        ] }) })
      ] }),
      isEdit && novelId !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "bg-card border-border",
          "data-ocid": "novel-form.coauthor_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-medium", children: "Collaborative Authors" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Co-authors can edit chapters and collaborate on your novel in real time." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CoAuthorPanel,
              {
                novelId,
                coAuthors: (existing == null ? void 0 : existing.coAuthors) ?? []
              }
            ) })
          ]
        }
      )
    ] })
  ] });
}
export {
  NovelFormPage as default
};
