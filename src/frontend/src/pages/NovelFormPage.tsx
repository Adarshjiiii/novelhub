import { createActor } from "@/backend";
import type { UserProfilePublic } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNovel } from "@/hooks/useApi";
import {
  useAddCoAuthor,
  useCreateNovel,
  useRemoveCoAuthor,
  useUpdateNovel,
} from "@/hooks/useAuthor";
import { useActor } from "@caffeineai/core-infrastructure";
import { Principal } from "@icp-sdk/core/principal";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookImage,
  Loader2,
  Save,
  Search,
  UserMinus,
  UserPlus,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Constants ────────────────────────────────────────────────────────────────

const GENRES = [
  "Fantasy",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Mystery",
  "Drama",
] as const;
type Genre = (typeof GENRES)[number];

// ── Cover Upload Component ──────────────────────────────────────────────────

interface CoverUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

function CoverUpload({ value, onChange, disabled }: CoverUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB");
      return;
    }
    setUploading(true);
    setProgress(0);
    const reader = new FileReader();
    reader.onprogress = (e) => {
      if (e.lengthComputable)
        setProgress(Math.round((e.loaded / e.total) * 100));
    };
    reader.onload = () => {
      onChange(reader.result as string);
      setUploading(false);
      setProgress(100);
    };
    reader.onerror = () => {
      toast.error("Failed to read image");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 transition-colors hover:border-accent/60 hover:bg-muted/30 cursor-pointer w-full"
        style={{ minHeight: "160px" }}
        onClick={() => !disabled && fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        disabled={disabled}
        data-ocid="novel-form.cover_dropzone"
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Cover preview"
              className="h-40 w-28 object-cover rounded-md shadow-md"
            />
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
                className="absolute top-2 right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs hover:opacity-90"
                aria-label="Remove cover image"
                data-ocid="novel-form.cover_remove_button"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 text-accent animate-spin" />
                <p className="text-sm text-muted-foreground">
                  Uploading… {progress}%
                </p>
                <div className="w-32 h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </>
            ) : (
              <>
                <BookImage className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">
                  Click or drag to upload cover
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WebP — max 5 MB
                </p>
              </>
            )}
          </div>
        )}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
        data-ocid="novel-form.cover_upload_button"
      />
    </div>
  );
}

// ── Co-Author Search ─────────────────────────────────────────────────────────

interface CoAuthorPanelProps {
  novelId: bigint;
  coAuthors: string[];
}

function CoAuthorPanel({ novelId, coAuthors }: CoAuthorPanelProps) {
  const { actor } = useActor(createActor);
  const addCoAuthor = useAddCoAuthor();
  const removeCoAuthor = useRemoveCoAuthor();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserProfilePublic[]>([]);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(
    (term: string) => {
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
          toast.error("Failed to search users");
        } finally {
          setSearching(false);
        }
      }, 350);
    },
    [actor],
  );

  const handleAdd = async (user: UserProfilePublic) => {
    const principal = user.id;
    if (coAuthors.includes(principal.toString())) {
      toast.info("Already a co-author");
      return;
    }
    try {
      await addCoAuthor.mutateAsync({ novelId, coAuthor: principal });
      toast.success(`Added ${user.username} as co-author`);
      setQuery("");
      setResults([]);
    } catch {
      toast.error("Failed to add co-author");
    }
  };

  const handleRemove = async (principalText: string) => {
    try {
      await removeCoAuthor.mutateAsync({
        novelId,
        coAuthor: Principal.fromText(principalText),
      });
      toast.success("Co-author removed");
    } catch {
      toast.error("Failed to remove co-author");
    }
  };

  return (
    <div className="space-y-4" data-ocid="novel-form.coauthor_panel">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm text-foreground">Co-Authors</h3>
        <span className="text-xs text-muted-foreground">
          {coAuthors.length} added
        </span>
      </div>

      {/* Current co-authors as chips */}
      {coAuthors.length > 0 && (
        <div
          className="flex flex-wrap gap-2"
          data-ocid="novel-form.coauthor_list"
        >
          {coAuthors.map((p, i) => (
            <Badge
              key={p}
              variant="secondary"
              className="flex items-center gap-1.5 pr-1"
              data-ocid={`novel-form.coauthor_chip.${i + 1}`}
            >
              <span className="truncate max-w-[120px] text-xs font-mono">
                {p.slice(0, 8)}…{p.slice(-4)}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(p)}
                className="h-4 w-4 rounded-full hover:bg-destructive/20 flex items-center justify-center transition-colors"
                aria-label="Remove co-author"
                data-ocid={`novel-form.coauthor_remove_button.${i + 1}`}
                disabled={removeCoAuthor.isPending}
              >
                <UserMinus className="h-2.5 w-2.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search by username…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            search(e.target.value);
          }}
          className="pl-9"
          data-ocid="novel-form.coauthor_search_input"
        />
        {searching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground animate-spin" />
        )}
      </div>

      {/* Search results */}
      {results.length > 0 && (
        <div
          className="rounded-md border border-border bg-card shadow-sm divide-y divide-border"
          data-ocid="novel-form.coauthor_results"
        >
          {results.slice(0, 5).map((user, i) => (
            <div
              key={user.id.toString()}
              className="flex items-center justify-between px-3 py-2 hover:bg-muted/30 transition-colors"
              data-ocid={`novel-form.coauthor_result.${i + 1}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="h-7 w-7 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium text-muted-foreground">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.username}
                  </p>
                  {user.bio && (
                    <p className="text-xs text-muted-foreground truncate">
                      {user.bio}
                    </p>
                  )}
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="shrink-0 text-accent hover:text-accent hover:bg-accent/10"
                onClick={() => handleAdd(user)}
                disabled={
                  addCoAuthor.isPending ||
                  coAuthors.includes(user.id.toString())
                }
                data-ocid={`novel-form.coauthor_add_button.${i + 1}`}
              >
                <UserPlus className="h-3.5 w-3.5 mr-1" />
                Add
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Form State ───────────────────────────────────────────────────────────────

interface FormState {
  title: string;
  description: string;
  genre: Genre;
  tags: string;
  coverImage: string;
}

const EMPTY: FormState = {
  title: "",
  description: "",
  genre: "Fantasy",
  tags: "",
  coverImage: "",
};

// ── Validation ───────────────────────────────────────────────────────────────

interface FormErrors {
  title?: string;
  genre?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.title.trim()) errors.title = "Title is required";
  if (form.title.trim().length > 200)
    errors.title = "Title must be 200 characters or fewer";
  if (!form.genre) errors.genre = "Genre is required";
  return errors;
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function NovelFormPage() {
  const params = useParams({ strict: false }) as { id?: string };
  const novelId = params.id ? BigInt(params.id) : null;
  const isEdit = novelId !== null;

  const { data: existing, isLoading: loadingExisting } = useNovel(
    params.id ?? "",
  );
  const createNovel = useCreateNovel();
  const updateNovel = useUpdateNovel();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});

  // Populate form in edit mode
  useEffect(() => {
    if (existing && isEdit) {
      setForm({
        title: existing.title,
        description: existing.description,
        genre:
          ((Array.isArray(existing.genre)
            ? existing.genre[0]
            : existing.genre) as Genre) ?? "Fantasy",
        tags: existing.tags.join(", "),
        coverImage: existing.coverImage ?? "",
      });
    }
  }, [existing, isEdit]);

  const setField =
    <K extends keyof FormState>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (touched[key]) {
        const errs = validate({ ...form, [key]: e.target.value });
        setErrors((prev) => ({
          ...prev,
          [key]: (errs as Record<string, string | undefined>)[key as string],
        }));
      }
    };

  const handleBlur = (key: keyof FormState) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validate(form)[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      coverImage: form.coverImage,
    };

    try {
      if (isEdit && novelId !== null) {
        await updateNovel.mutateAsync({ novelId, req });
        toast.success("Novel updated successfully");
        navigate({ to: "/author-dashboard" });
      } else {
        const id = await createNovel.mutateAsync({ req, authorName: "" });
        toast.success("Novel created!");
        navigate({
          to: "/author/novel/$id/edit",
          params: { id: id.toString() },
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setApiError(msg);
      toast.error(isEdit ? "Failed to update novel" : "Failed to create novel");
    }
  };

  const isPending = createNovel.isPending || updateNovel.isPending;

  // Loading skeleton in edit mode
  if (isEdit && loadingExisting) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-8 space-y-4"
        data-ocid="novel-form.loading_state"
      >
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" data-ocid="novel-form.page">
      {/* Back button */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => navigate({ to: "/author-dashboard" })}
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
        data-ocid="novel-form.back_button"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </Button>

      <div className="space-y-4">
        {/* Main form card */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-xl">
              {isEdit ? "Edit Novel" : "Create New Novel"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* API-level error */}
              {apiError && (
                <div
                  className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  data-ocid="novel-form.error_state"
                >
                  {apiError}
                </div>
              )}

              {/* Title */}
              <div className="space-y-1.5">
                <Label htmlFor="nf-title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nf-title"
                  value={form.title}
                  onChange={setField("title")}
                  onBlur={handleBlur("title")}
                  placeholder="Enter your novel's title"
                  maxLength={200}
                  data-ocid="novel-form.title_input"
                  aria-invalid={!!errors.title}
                  aria-describedby={errors.title ? "nf-title-err" : undefined}
                />
                {errors.title && (
                  <p
                    id="nf-title-err"
                    className="text-xs text-destructive"
                    data-ocid="novel-form.title.field_error"
                  >
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Genre */}
              <div className="space-y-1.5">
                <Label htmlFor="nf-genre">
                  Genre <span className="text-destructive">*</span>
                </Label>
                <select
                  id="nf-genre"
                  value={form.genre}
                  onChange={setField("genre")}
                  onBlur={handleBlur("genre")}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  data-ocid="novel-form.genre_select"
                  aria-invalid={!!errors.genre}
                >
                  {GENRES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.genre && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="novel-form.genre.field_error"
                  >
                    {errors.genre}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="nf-desc">
                  Description{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="nf-desc"
                  value={form.description}
                  onChange={setField("description")}
                  placeholder="What is your novel about? Entice readers with a compelling summary…"
                  rows={4}
                  data-ocid="novel-form.description_input"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <Label htmlFor="nf-tags">
                  Tags{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (comma-separated)
                  </span>
                </Label>
                <Input
                  id="nf-tags"
                  value={form.tags}
                  onChange={setField("tags")}
                  placeholder="magic, dragons, epic adventure"
                  data-ocid="novel-form.tags_input"
                />
              </div>

              {/* Cover image */}
              <div className="space-y-1.5">
                <Label>Cover Image</Label>
                <CoverUpload
                  value={form.coverImage}
                  onChange={(url) =>
                    setForm((f) => ({ ...f, coverImage: url }))
                  }
                  disabled={isPending}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate({ to: "/author-dashboard" })}
                  disabled={isPending}
                  data-ocid="novel-form.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  data-ocid="novel-form.submit_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {isEdit ? "Save Changes" : "Create Novel"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Co-author management — edit mode only */}
        {isEdit && novelId !== null && (
          <Card
            className="bg-card border-border"
            data-ocid="novel-form.coauthor_section"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">
                Collaborative Authors
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Co-authors can edit chapters and collaborate on your novel in
                real time.
              </p>
            </CardHeader>
            <CardContent>
              <CoAuthorPanel
                novelId={novelId}
                coAuthors={existing?.coAuthors ?? []}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
