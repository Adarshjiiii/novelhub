import { NovelCard } from "@/components/NovelCard";
import { ProgressBar } from "@/components/ProgressBar";
import { RankingCard } from "@/components/RankingCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNovels, useReadingHistory, useTopNovels } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import type { Novel } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  BookText,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Library,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";

// ── Stats bar data ───────────────────────────────────────────────────────────
const SITE_STATS = [
  {
    icon: BookText,
    label: "Total Novels",
    value: "12,400+",
    color: "text-primary",
  },
  {
    icon: Users,
    label: "Active Readers",
    value: "340K+",
    color: "text-accent",
  },
  {
    icon: BookOpen,
    label: "Read This Week",
    value: "86,200",
    color: "text-secondary",
  },
  {
    icon: Sparkles,
    label: "New Chapters Today",
    value: "1,820",
    color: "text-primary",
  },
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
  "Historical",
];

// ── Hero Carousel ──────────────────────────────────────────────────────────
function HeroSection() {
  const { data: topNovels, isLoading } = useTopNovels();
  const [active, setActive] = useState(0);

  if (isLoading) {
    return (
      <section className="mb-10" data-ocid="home.hero_loading_state">
        <Skeleton className="h-52 rounded-2xl mb-4" />
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((k) => (
            <Skeleton key={k} className="aspect-[2/3] rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (!topNovels?.length) return null;

  const featured = topNovels[active];
  const prev = () =>
    setActive((a) => (a - 1 + topNovels.length) % topNovels.length);
  const next = () => setActive((a) => (a + 1) % topNovels.length);

  return (
    <section className="mb-10" data-ocid="home.hero_section">
      {/* Big featured banner */}
      <div
        className="relative rounded-2xl overflow-hidden mb-5 group"
        style={{ minHeight: 220 }}
      >
        <img
          src="/assets/generated/novelhub-home-hero.dim_1400x500.jpg"
          alt="NovelHub Hero"
          className="w-full h-56 object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-secondary text-xs">
              #{featured.rank} THIS WEEK
            </span>
            <span className="badge-accent text-xs">{featured.genre[0]}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-black text-foreground leading-tight max-w-md">
            {featured.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            by {featured.author}
          </p>
          <p className="text-xs text-muted-foreground mt-2 max-w-sm line-clamp-2">
            {featured.description}
          </p>
          <div className="flex items-center gap-3 mt-4">
            <Link to="/novel/$id" params={{ id: featured.id }}>
              <Button
                size="sm"
                className="button-primary gap-1.5"
                data-ocid="home.hero_read_button"
              >
                <BookOpen className="h-4 w-4" />
                Start Reading
              </Button>
            </Link>
            <Link to="/library">
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                data-ocid="home.hero_library_link"
              >
                <Library className="h-4 w-4" />
                Browse All
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Top 5 grid */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-lg font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-secondary" />
          Top 5 Novels This Week
        </h2>
        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={prev}
            data-ocid="home.hero_prev"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={next}
            data-ocid="home.hero_next"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {topNovels.map((novel, i) => (
          <RankingCard
            key={novel.id}
            novel={novel}
            isActive={i === active}
            onClick={() => setActive(i)}
            dataOcid={`home.top_novel.${i + 1}`}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {topNovels.map((n, i) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active
                ? "w-5 bg-primary"
                : "w-1.5 bg-muted hover:bg-muted-foreground"
            }`}
            aria-label={`Select novel ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section
      className="mb-10 grid grid-cols-2 sm:grid-cols-4 gap-3"
      data-ocid="home.stats_section"
    >
      {SITE_STATS.map((s) => (
        <div
          key={s.label}
          className="card-elevated p-4 flex items-center gap-3"
        >
          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <s.icon className={`h-5 w-5 ${s.color}`} />
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-base leading-none">
              {s.value}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
              {s.label}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

// ── Continue Reading ─────────────────────────────────────────────────────────
function ContinueReadingSection({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { principal } = useAuth();
  const { data: history, isLoading } = useReadingHistory(
    principal ?? undefined,
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current)
      scrollRef.current.scrollLeft += dir === "left" ? -260 : 260;
  };

  if (!isLoggedIn) {
    return (
      <section
        className="mb-10 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-accent/10 border border-border p-6 flex flex-col sm:flex-row items-center gap-4"
        data-ocid="home.guest_cta_section"
      >
        <div className="flex-1">
          <h2 className="font-display text-xl font-bold mb-1">
            Start Your Reading Journey
          </h2>
          <p className="text-sm text-muted-foreground">
            Sign in to track your reading progress, connect with friends, and
            get personalized recommendations.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link to="/login">
            <Button
              className="button-primary gap-2"
              data-ocid="home.guest_login_button"
            >
              <Sparkles className="h-4 w-4" />
              Sign In
            </Button>
          </Link>
          <Link to="/library">
            <Button
              variant="outline"
              className="gap-2"
              data-ocid="home.guest_browse_button"
            >
              <Library className="h-4 w-4" />
              Browse Free
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-10" data-ocid="home.continue_reading_section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-bold flex items-center gap-2">
          <Clock className="h-5 w-5 text-accent" />
          Continue Reading
        </h2>
        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => scroll("left")}
            data-ocid="home.continue_prev"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => scroll("right")}
            data-ocid="home.continue_next"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex gap-4">
          {[1, 2, 3].map((k) => (
            <div key={k} className="shrink-0 w-40">
              <Skeleton className="aspect-[2/3] rounded-lg mb-2" />
              <Skeleton className="h-3 w-3/4 mb-1" />
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
      ) : history && history.length > 0 ? (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-none pb-2"
        >
          {history.map((item, i) => (
            <Link
              key={item.novelId}
              to="/novel/$id"
              params={{ id: item.novelId }}
              className="shrink-0 w-40 group"
              data-ocid={`home.continue_reading.${i + 1}`}
            >
              <div className="rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[2/3] bg-muted relative">
                  <img
                    src={item.novelCover}
                    alt={item.novelTitle}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded-full font-medium">
                    Ch. {item.chapterNumber}/{item.totalChapters}
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold line-clamp-2 leading-snug mb-2">
                    {item.novelTitle}
                  </p>
                  <ProgressBar
                    value={item.progressPercent}
                    showLabel
                    size="sm"
                    color="primary"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-10 text-muted-foreground rounded-xl border border-dashed border-border"
          data-ocid="home.continue_reading.empty_state"
        >
          <BookOpen className="h-10 w-10 mb-3 opacity-30" />
          <p className="text-sm font-medium">No reading history yet</p>
          <p className="text-xs mt-1 opacity-70">
            Start reading to track your progress here
          </p>
          <Link to="/library" className="mt-3">
            <Button
              size="sm"
              variant="outline"
              data-ocid="home.continue_reading.browse_button"
            >
              Explore Library
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}

// ── Trending by Genre ────────────────────────────────────────────────────────
function TrendingSection() {
  const [activeGenre, setActiveGenre] = useState("All");
  const { data: allNovels, isLoading } = useNovels();

  const filtered: Novel[] =
    allNovels && activeGenre !== "All"
      ? allNovels.filter((n) => n.genre.includes(activeGenre))
      : (allNovels ?? []);

  return (
    <section className="mb-10" data-ocid="home.trending_section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-bold flex items-center gap-2">
          <Flame className="h-5 w-5 text-destructive" />
          Trending Now
        </h2>
        <Link
          to="/library"
          className="text-xs text-primary hover:underline"
          data-ocid="home.view_all_link"
        >
          View all →
        </Link>
      </div>

      {/* Genre tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-5">
        {GENRES.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setActiveGenre(g)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              g === activeGenre
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                : "bg-muted text-muted-foreground hover:bg-muted-foreground/20"
            }`}
            data-ocid={`home.genre_tab.${g.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
          >
            {g}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((k) => (
            <Skeleton key={k} className="aspect-[2/3] rounded-xl" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {filtered.map((novel, i) => (
            <NovelCard
              key={novel.id}
              novel={novel}
              size="sm"
              dataOcid={`home.trending_novel.${i + 1}`}
            />
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center py-12 text-muted-foreground"
          data-ocid="home.trending.empty_state"
        >
          <p className="text-sm">No novels in this genre yet.</p>
          <button
            type="button"
            onClick={() => setActiveGenre("All")}
            className="mt-2 text-xs text-primary hover:underline"
          >
            Show all genres
          </button>
        </div>
      )}
    </section>
  );
}

// ── New Arrivals ───────────────────────────────────────────────────────────────
function NewArrivalsSection() {
  const { data: allNovels } = useNovels();
  const newNovels = allNovels?.filter((n) => n.isNew) ?? [];
  if (!newNovels.length) return null;

  return (
    <section className="mb-10" data-ocid="home.new_arrivals_section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          New Arrivals
          <Badge
            variant="outline"
            className="ml-1 border-accent/40 text-accent text-[10px] px-1.5"
          >
            {newNovels.length} new
          </Badge>
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
        {newNovels.map((novel, i) => (
          <div key={novel.id} className="shrink-0 w-36">
            <NovelCard
              novel={novel}
              size="sm"
              dataOcid={`home.new_arrival.${i + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div data-ocid="home.page">
      <HeroSection />
      <StatsBar />
      <ContinueReadingSection isLoggedIn={isAuthenticated} />
      <TrendingSection />
      <NewArrivalsSection />
    </div>
  );
}
