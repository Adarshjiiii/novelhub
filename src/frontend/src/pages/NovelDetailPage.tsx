import { ChapterList, ResumeButton } from "@/components/ChapterList";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChapters, useNovel } from "@/hooks/useApi";
import { MOCK_NOVELS, MOCK_READING_HISTORY } from "@/lib/mockData";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Eye,
  Heart,
  Pencil,
  Share2,
  Users,
} from "lucide-react";
import { useState } from "react";

const AUTHOR_BIOS: Record<string, string> = {
  "Marissa Meyer":
    "New York Times bestselling author known for the Lunar Chronicles series, a retelling of classic fairy tales set in a futuristic world. Her works blend science fiction and romance in unique ways.",
  "Elara Vance":
    "Dark fantasy author celebrated for intricate world-building and complex anti-heroes. Her Shadowrealm saga has captivated readers across 40 countries.",
  "Kai Thorne":
    "Cyberpunk visionary and former software engineer. His debut novel Neon Echoes became an instant phenomenon, praised for its technical authenticity and pulse-pounding narrative.",
  "Aria Finch":
    "Nature-inspired fantasy author and environmental activist. Her YA novels carry both lyrical prose and deeply human themes about belonging and identity.",
  "Marcus Cole":
    "Epic fantasy and historical romance author with a background in classical literature. His immortal heroes are beloved for their emotional depth and moral complexity.",
};

export default function NovelDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: novel, isLoading } = useNovel(id);
  const { data: chapters = [], isLoading: chaptersLoading } = useChapters(id);
  const [descExpanded, setDescExpanded] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const progress = MOCK_READING_HISTORY.find((r) => r.novelId === id) ?? null;
  const progressPercent = progress
    ? Math.round((progress.chapterNumber / (chapters.length || 1)) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="space-y-6" data-ocid="novel_detail.loading_state">
        <Skeleton className="h-52 w-full rounded-2xl" />
        <div className="flex gap-6">
          <Skeleton className="w-36 h-52 rounded-xl shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!novel) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 text-muted-foreground"
        data-ocid="novel_detail.error_state"
      >
        <BookOpen className="h-16 w-16 mb-4 opacity-30" />
        <h2 className="font-display text-xl font-bold mb-2">Novel Not Found</h2>
        <p className="text-sm mb-4">This novel doesn't exist or was removed.</p>
        <Link to="/">
          <Button data-ocid="novel_detail.back_home_button">
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const authorBio =
    AUTHOR_BIOS[novel.author] ??
    `${novel.author} is a talented author whose works have captivated thousands of readers worldwide. Known for rich storytelling and immersive world-building.`;

  const descriptionLong = novel.description.length > 180;
  const displayDescription =
    descriptionLong && !descExpanded
      ? `${novel.description.slice(0, 180)}...`
      : novel.description;

  return (
    <div data-ocid="novel_detail.page">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors"
        data-ocid="novel_detail.back_button"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      {/* Hero Banner */}
      <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-xl mb-6">
        <div className="relative h-52 md:h-64 overflow-hidden">
          <img
            src={novel.coverImage}
            alt={novel.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/95" />
          <div className="absolute top-4 right-4">
            <Badge
              className={[
                "text-xs font-semibold uppercase tracking-wide",
                novel.status === "ongoing"
                  ? "bg-accent/90 text-accent-foreground"
                  : novel.status === "completed"
                    ? "bg-primary/90 text-primary-foreground"
                    : "bg-muted text-muted-foreground",
              ].join(" ")}
            >
              {novel.status}
            </Badge>
          </div>
        </div>

        <div className="flex gap-5 p-5 -mt-20 relative">
          <div className="w-28 md:w-36 shrink-0 rounded-xl overflow-hidden border-4 border-card shadow-2xl">
            <div className="aspect-[2/3]">
              <img
                src={novel.coverImage}
                alt={novel.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0 pt-14">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="font-display text-2xl md:text-3xl font-bold line-clamp-2 leading-tight">
                  {novel.title}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  by{" "}
                  <span className="text-foreground font-medium">
                    {novel.author}
                  </span>
                </p>
                <div className="mt-2">
                  <StarRating
                    rating={novel.rating}
                    reviewCount={novel.reviewCount}
                    size="md"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {novel.genre.map((g) => (
                    <Badge key={g} className="badge-accent text-xs">
                      {g}
                    </Badge>
                  ))}
                  {novel.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-xs text-muted-foreground"
                    >
                      #{t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Bookmark"
                  data-ocid="novel_detail.bookmark_button"
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Share"
                  data-ocid="novel_detail.share_button"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                icon: Eye,
                label: "Reads",
                value: `${(novel.views / 1000).toFixed(0)}K`,
                color: "text-accent",
              },
              {
                icon: Heart,
                label: "Likes",
                value: `${(novel.likes / 1000).toFixed(0)}K`,
                color: "text-destructive",
              },
              {
                icon: BookOpen,
                label: "Chapters",
                value: novel.chapterCount.toString(),
                color: "text-primary",
              },
              {
                icon: Users,
                label: "Reviews",
                value: `${(novel.reviewCount / 1000).toFixed(1)}K`,
                color: "text-secondary",
              },
            ].map((s) => (
              <div key={s.label} className="card-elevated p-3 text-center">
                <s.icon className={`h-4 w-4 mx-auto mb-1 ${s.color}`} />
                <p className="font-display font-bold text-base">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {progress && (
            <div
              className="card-elevated p-4 space-y-2"
              data-ocid="novel_detail.progress_card"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Your Progress</span>
                <span className="text-muted-foreground">
                  Ch. {progress.chapterNumber} / {progress.totalChapters} —{" "}
                  {progressPercent}%
                </span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          )}

          <Tabs defaultValue="chapters">
            <TabsList className="bg-muted">
              <TabsTrigger
                value="chapters"
                data-ocid="novel_detail.chapters_tab"
              >
                Chapters ({chapters.length || novel.chapterCount})
              </TabsTrigger>
              <TabsTrigger value="about" data-ocid="novel_detail.about_tab">
                About
              </TabsTrigger>
              <TabsTrigger value="reviews" data-ocid="novel_detail.reviews_tab">
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chapters" className="mt-4">
              <ChapterList
                chapters={chapters}
                novelId={id}
                isLoading={chaptersLoading}
                progress={progress}
              />
              {chapters.length < novel.chapterCount && (
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Showing {chapters.length} of {novel.chapterCount} chapters
                </p>
              )}
            </TabsContent>

            <TabsContent value="about" className="mt-4 space-y-4">
              <div>
                <h3 className="font-display font-semibold mb-2">Synopsis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {displayDescription}
                </p>
                {descriptionLong && (
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
                    onClick={() => setDescExpanded((x) => !x)}
                    data-ocid="novel_detail.expand_desc_button"
                  >
                    {descExpanded ? (
                      <>
                        <ChevronUp className="h-3 w-3" /> Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3" /> Read more
                      </>
                    )}
                  </button>
                )}
              </div>
              <div>
                <h3 className="font-display font-semibold mb-2">
                  Genres &amp; Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {novel.genre.map((g) => (
                    <Badge key={g} className="badge-accent">
                      {g}
                    </Badge>
                  ))}
                  {novel.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-muted-foreground"
                    >
                      #{t}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4 space-y-5">
              <div
                className="card-elevated p-4"
                data-ocid="novel_detail.rate_section"
              >
                <p className="text-sm font-semibold mb-2">
                  {userRating ? "Your rating:" : "Rate this novel:"}
                </p>
                <StarRating
                  rating={userRating || novel.rating}
                  interactive
                  onRate={setUserRating}
                  size="lg"
                />
                {userRating > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Thanks for rating!
                  </p>
                )}
              </div>

              {[
                {
                  user: "Alex R.",
                  rating: 5,
                  text: "Absolutely gripping from start to finish! The world-building is extraordinary.",
                  date: "2 days ago",
                },
                {
                  user: "Maya T.",
                  rating: 4,
                  text: "Beautifully written with deep, complex characters. The pacing could be tighter but overall a must-read.",
                  date: "1 week ago",
                },
                {
                  user: "Ben L.",
                  rating: 5,
                  text: "One of the best novels I've read in years. The emotional depth is unmatched.",
                  date: "2 weeks ago",
                },
              ].map((r, i) => (
                <div
                  key={r.user}
                  className="card-elevated p-4"
                  data-ocid={`novel_detail.review.${i + 1}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      {r.user[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium">{r.user}</span>
                        <span className="text-xs text-muted-foreground">
                          {r.date}
                        </span>
                      </div>
                    </div>
                    <StarRating rating={r.rating} size="sm" />
                  </div>
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {progress ? (
            <ResumeButton progress={progress} novelId={id} />
          ) : (
            chapters.length > 0 && (
              <Link
                to="/chapter/$novelId/$chapterId"
                params={{ novelId: id, chapterId: chapters[0].id }}
              >
                <Button
                  className="w-full gap-2 button-primary"
                  data-ocid="novel_detail.read_button"
                >
                  <BookOpen className="h-4 w-4" /> Start Reading
                </Button>
              </Link>
            )
          )}
          <Button
            variant="outline"
            className="w-full gap-2"
            data-ocid="novel_detail.collab_button"
          >
            <Pencil className="h-4 w-4" /> Collaborate
          </Button>

          <Separator />

          <div className="card-elevated p-4">
            <h3 className="font-display font-semibold text-sm mb-3">
              Novel Info
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Status", value: novel.status },
                { label: "Chapters", value: novel.chapterCount },
                {
                  label: "Words",
                  value: `${(novel.wordCount / 1000).toFixed(0)}K`,
                },
                { label: "Reviews", value: novel.reviewCount.toLocaleString() },
              ].map((info) => (
                <div key={info.label} className="flex justify-between">
                  <span className="text-muted-foreground">{info.label}</span>
                  <span className="font-medium capitalize">{info.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="card-elevated p-4"
            data-ocid="novel_detail.author_card"
          >
            <h3 className="font-display font-semibold text-sm mb-3">
              About the Author
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-base font-bold shrink-0">
                {novel.author
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{novel.author}</p>
                <p className="text-xs text-muted-foreground">Author</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
              {authorBio}
            </p>
            <Separator className="my-3" />
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              More by this author
            </p>
            {MOCK_NOVELS.filter((n) => n.id !== novel.id)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.id}
                  to="/novel/$id"
                  params={{ id: related.id }}
                  className="flex items-center gap-2 p-1.5 rounded hover:bg-muted transition-colors"
                >
                  <div className="w-7 h-10 rounded overflow-hidden shrink-0">
                    <img
                      src={related.coverImage}
                      alt={related.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium line-clamp-2">
                    {related.title}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
