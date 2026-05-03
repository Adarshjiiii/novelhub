import type { NovelPublic } from "@/backend.d";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyProfile } from "@/hooks/useApi";
import {
  useAuthorNovels,
  useBecomeAuthor,
  useDeleteNovel,
} from "@/hooks/useAuthor";
import type { AuthorStats } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Edit,
  Plus,
  Star,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { toast } from "sonner";

// ── Become-Author screen ─────────────────────────────────────────────────────

function BecomeAuthorScreen() {
  const becomeAuthor = useBecomeAuthor();

  const handleBecomeAuthor = async () => {
    try {
      await becomeAuthor.mutateAsync();
      toast.success("Welcome to the author community!");
    } catch {
      toast.error("Failed to activate author status. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[70vh] px-4"
      data-ocid="become-author.page"
    >
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-accent" />
          </div>
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">
          Become an Author
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Join NovelHub&apos;s community of writers. Create and publish original
          novels, collaborate in real-time with co-authors, and reach readers
          around the world.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: BookOpen, label: "Publish Novels" },
            { icon: Users, label: "Co-Author" },
            { icon: TrendingUp, label: "Track Reads" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border"
            >
              <Icon className="h-5 w-5 text-accent" />
              <span className="text-xs text-muted-foreground font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>
        <Button
          size="lg"
          className="w-full"
          onClick={handleBecomeAuthor}
          disabled={becomeAuthor.isPending}
          data-ocid="become-author.register_button"
        >
          {becomeAuthor.isPending ? "Activating…" : "Start Writing Today"}
        </Button>
      </div>
    </div>
  );
}

// ── Stats bar ────────────────────────────────────────────────────────────────

function StatsBar({ stats }: { stats: AuthorStats }) {
  const items = [
    { label: "Novels", value: stats.totalNovels, icon: BookOpen },
    {
      label: "Total Reads",
      value: stats.totalReads.toLocaleString(),
      icon: TrendingUp,
    },
    {
      label: "Avg Rating",
      value: stats.avgRating > 0 ? stats.avgRating.toFixed(1) : "—",
      icon: Star,
    },
  ];
  return (
    <div
      className="grid grid-cols-3 gap-4 mb-8"
      data-ocid="author-dashboard.stats"
    >
      {items.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="bg-card border-border">
          <CardHeader className="pb-0 pt-4 px-4">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-accent" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {label}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pb-4 px-4 pt-1">
            <p className="font-display text-2xl font-bold text-foreground">
              {value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── Novel card ───────────────────────────────────────────────────────────────

function NovelCard({ novel, index }: { novel: NovelPublic; index: number }) {
  const deleteNovel = useDeleteNovel();

  const handleDelete = async () => {
    try {
      await deleteNovel.mutateAsync({ novelId: novel.id });
      toast.success(`"${novel.title}" deleted.`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete novel";
      toast.error(msg);
    }
  };

  const isDeleting = deleteNovel.isPending;

  return (
    <Card
      className="bg-card border-border flex flex-col overflow-hidden transition-smooth hover:border-accent/30 hover:shadow-lg"
      data-ocid={`author-dashboard.novel_card.item.${index + 1}`}
    >
      {/* Cover */}
      <div className="relative h-44 bg-muted overflow-hidden">
        {novel.coverImage ? (
          <img
            src={novel.coverImage}
            alt={novel.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-muted-foreground/40" />
          </div>
        )}
        {/* Genre badge overlay */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-xs author-badge">
            {novel.genre}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <CardContent className="flex flex-col flex-1 gap-2 p-4">
        <p className="font-display font-semibold text-foreground line-clamp-2 leading-tight">
          {novel.title}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {novel.totalReads.toString()} reads
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 text-secondary" />
            {novel.avgRating > 0 ? novel.avgRating.toFixed(1) : "—"}
          </span>
          {novel.coAuthors.length > 0 && (
            <span className="flex items-center gap-1 text-accent">
              <Users className="h-3 w-3" />
              {novel.coAuthors.length}
            </span>
          )}
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="px-4 pb-4 pt-0 flex gap-2">
        <Link
          to="/author/novel/$id/chapter/new"
          params={{ id: novel.id.toString() }}
          className="flex-1"
        >
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            data-ocid={`author-dashboard.add_chapter_button.${index + 1}`}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Chapter
          </Button>
        </Link>
        <Link to="/author/novel/$id/edit" params={{ id: novel.id.toString() }}>
          <Button
            size="sm"
            variant="outline"
            data-ocid={`author-dashboard.edit_button.${index + 1}`}
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              data-ocid={`author-dashboard.delete_button.${index + 1}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent
            data-ocid={`author-dashboard.delete_dialog.${index + 1}`}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete &ldquo;{novel.title}&rdquo;?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. All chapters and reading progress
                associated with this novel will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                data-ocid={`author-dashboard.delete_cancel.${index + 1}`}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-ocid={`author-dashboard.delete_confirm.${index + 1}`}
              >
                {isDeleting ? "Deleting…" : "Delete Novel"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

// ── Empty state ──────────────────────────────────────────────────────────────

function EmptyNovels() {
  return (
    <div
      className="col-span-full flex flex-col items-center justify-center py-20 text-center"
      data-ocid="author-dashboard.empty_state"
    >
      <div className="mb-5 h-20 w-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
        <BookOpen className="h-10 w-10 text-accent" />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        No novels yet
      </h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-6">
        Start writing your first novel and share your stories with the world.
      </p>
      <Link to="/author/novel/new">
        <Button data-ocid="author-dashboard.empty_cta_button">
          <Plus className="h-4 w-4 mr-2" />
          Write Your First Novel
        </Button>
      </Link>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function AuthorDashboardPage() {
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: novels, isLoading: novelsLoading } = useAuthorNovels();

  // Show become-author screen if not yet an author
  if (profileLoading) {
    return (
      <div
        className="max-w-5xl mx-auto px-4 py-8"
        data-ocid="author-dashboard.loading_state"
      >
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!profile?.isAuthor) {
    return <BecomeAuthorScreen />;
  }

  // Compute stats from fetched novels
  const stats: AuthorStats = {
    totalNovels: novels?.length ?? 0,
    totalReads: novels?.reduce((a, n) => a + Number(n.totalReads), 0) ?? 0,
    avgRating:
      novels && novels.length > 0
        ? novels.reduce((a, n) => a + n.avgRating, 0) / novels.length
        : 0,
  };

  return (
    <div
      className="max-w-5xl mx-auto px-4 py-8"
      data-ocid="author-dashboard.page"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Author Dashboard
            </h1>
            <span className="author-badge">Author</span>
          </div>
          <p className="text-muted-foreground">
            Manage your novels, chapters, and collaborations
          </p>
        </div>
        <Link to="/author/novel/new">
          <Button data-ocid="author-dashboard.create_novel_button">
            <Plus className="h-4 w-4 mr-2" />
            Create Novel
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <StatsBar stats={stats} />

      {/* Novel grid */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Your Novels
        </h2>
        {novels && novels.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {novels.length} total
          </span>
        )}
      </div>

      {novelsLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
          data-ocid="author-dashboard.novels_loading_state"
        >
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-72 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {!novels || novels.length === 0 ? (
            <EmptyNovels />
          ) : (
            novels.map((novel, i) => (
              <NovelCard key={novel.id.toString()} novel={novel} index={i} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
