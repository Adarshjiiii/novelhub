import { GenreFilter } from "@/components/GenreFilter";
import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNovels, useReadingHistory } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import type { Novel } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowDownAZ,
  BookMarked,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Heart,
  SortAsc,
  Star,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";

const SORT_OPTIONS = [
  { label: "Latest", value: "latest", icon: TrendingUp },
  { label: "Most Read", value: "most_read", icon: Eye },
  { label: "Highest Rated", value: "highest_rated", icon: Star },
  { label: "Alphabetical", value: "alphabetical", icon: ArrowDownAZ },
  { label: "Most Liked", value: "most_liked", icon: Heart },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

const PAGE_SIZE = 12;

function NovelGridCard({ novel, index }: { novel: Novel; index: number }) {
  const statusColor =
    novel.status === "completed"
      ? "text-accent border-accent/40"
      : novel.status === "ongoing"
        ? "text-secondary border-secondary/40"
        : "text-muted-foreground border-border";

  return (
    <Link
      to="/novel/$id"
      params={{ id: novel.id }}
      data-ocid={`library.novel.item.${index}`}
      className="block group"
    >
      <div className="relative rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5">
        {/* Cover */}
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          <img
            src={novel.coverImage}
            alt={novel.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          {/* Top badges */}
          <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
            {novel.isTrending && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary text-secondary-foreground shadow">
                HOT
              </span>
            )}
            {novel.isNew && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent text-accent-foreground shadow">
                NEW
              </span>
            )}
          </div>
          {/* Rating pill */}
          <div className="absolute bottom-2 right-2">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/90 backdrop-blur-sm text-[11px] font-semibold">
              <Star className="h-3 w-3 fill-secondary text-secondary" />
              {novel.rating.toFixed(1)}
            </span>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 p-4">
            <p className="text-xs text-center text-muted-foreground line-clamp-5 leading-relaxed">
              {novel.description}
            </p>
            <Button
              size="sm"
              className="w-full max-w-[140px] bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid={`library.read_now.${index}`}
            >
              <BookOpen className="h-3.5 w-3.5 mr-1.5" />
              Read Now
            </Button>
          </div>
        </div>
        {/* Info */}
        <div className="p-3 space-y-1.5">
          <h3 className="font-display font-semibold text-sm leading-tight line-clamp-2">
            {novel.title}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {novel.author}
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">
            {novel.genre.slice(0, 1).map((g) => (
              <Badge
                key={g}
                variant="secondary"
                className="text-[10px] px-1.5 py-0 font-medium"
              >
                {g}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className={`text-[10px] px-1.5 py-0 ${statusColor}`}
            >
              {novel.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {(novel.views / 1000).toFixed(0)}K
            </span>
            <span>{novel.chapterCount} ch.</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function NovelGridSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card">
      <Skeleton className="aspect-[2/3] w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3.5 w-4/5" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [activeTab, setActiveTab] = useState<
    "discover" | "reading" | "bookmarked"
  >("discover");
  const [sort, setSort] = useState<SortValue>("latest");
  const [page, setPage] = useState(1);
  const { principal } = useAuth();
  const { data: novels, isLoading } = useNovels(
    activeGenre === "All" ? undefined : activeGenre,
  );
  const { data: history } = useReadingHistory(principal ?? undefined);

  const sorted = useMemo(() => {
    if (!novels) return [];
    const base = novels.filter(
      (n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.author.toLowerCase().includes(search.toLowerCase()),
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

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Sort";

  function handleGenreSelect(genre: string) {
    setActiveGenre(genre);
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  const SKELETON_ITEMS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

  return (
    <div data-ocid="library.page" className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-display text-2xl font-bold mb-1">Browse Library</h1>
        <p className="text-muted-foreground text-sm">
          Discover thousands of novels across every genre
        </p>
      </div>

      {/* Main tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as typeof activeTab)}
      >
        <TabsList className="bg-muted">
          <TabsTrigger value="discover" data-ocid="library.discover_tab">
            Discover
          </TabsTrigger>
          <TabsTrigger value="reading" data-ocid="library.reading_tab">
            Reading
          </TabsTrigger>
          <TabsTrigger value="bookmarked" data-ocid="library.bookmarked_tab">
            Bookmarked
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search + Sort row */}
      {activeTab === "discover" && (
        <div className="flex gap-2 items-center">
          <SearchBar value={search} onChange={handleSearch} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="shrink-0 gap-1.5 text-sm"
                data-ocid="library.sort_dropdown"
              >
                <SortAsc className="h-4 w-4" />
                <span className="hidden sm:inline">{activeSortLabel}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {SORT_OPTIONS.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => {
                    setSort(opt.value);
                    setPage(1);
                  }}
                  className={`gap-2 ${sort === opt.value ? "text-primary font-medium" : ""}`}
                  data-ocid={`library.sort.${opt.value}`}
                >
                  <opt.icon className="h-3.5 w-3.5 shrink-0" />
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Genre filter */}
      {activeTab === "discover" && (
        <GenreFilter active={activeGenre} onSelect={handleGenreSelect} />
      )}

      {/* Discover grid */}
      {activeTab === "discover" &&
        (isLoading ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid="library.loading_state"
          >
            {SKELETON_ITEMS.map((k) => (
              <NovelGridSkeleton key={k} />
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-muted-foreground rounded-xl border border-dashed border-border"
            data-ocid="library.empty_state"
          >
            <Filter className="h-12 w-12 mb-4 opacity-25" />
            <p className="text-base font-semibold">No novels found</p>
            <p className="text-sm mt-1 mb-4">
              Try a different search term or genre
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setActiveGenre("All");
              }}
              data-ocid="library.clear_filters_button"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginated.map((novel, i) => (
                <NovelGridCard
                  key={novel.id}
                  novel={novel}
                  index={(page - 1) * PAGE_SIZE + i + 1}
                />
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div
                className="flex items-center justify-center gap-2 pt-2"
                data-ocid="library.pagination"
              >
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  aria-label="Previous page"
                  data-ocid="library.pagination_prev"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                  (p) => (
                    <Button
                      key={p}
                      variant={page === p ? "default" : "outline"}
                      size="icon"
                      onClick={() => setPage(p)}
                      aria-label={`Page ${p}`}
                      aria-current={page === p ? "page" : undefined}
                      data-ocid={`library.page_btn.${p}`}
                      className="w-9 h-9 text-sm"
                    >
                      {p}
                    </Button>
                  ),
                )}
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  aria-label="Next page"
                  data-ocid="library.pagination_next"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ))}

      {/* Reading tab */}
      {activeTab === "reading" && (
        <div className="space-y-3">
          {(history ?? []).length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-muted-foreground rounded-xl border border-dashed border-border"
              data-ocid="library.reading_empty_state"
            >
              <BookMarked className="h-12 w-12 mb-4 opacity-25" />
              <p className="text-base font-semibold">No novels in progress</p>
              <p className="text-sm mt-1">
                Start reading to see your progress here
              </p>
            </div>
          ) : (
            history?.map((item, i) => (
              <Link
                key={item.novelId}
                to="/novel/$id"
                params={{ id: item.novelId }}
                data-ocid={`library.reading_item.${i + 1}`}
                className="block"
              >
                <div className="card-elevated p-4 flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200">
                  <div className="w-14 shrink-0">
                    <div className="aspect-[2/3] bg-muted rounded-md overflow-hidden">
                      <img
                        src={item.novelCover}
                        alt={item.novelTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm line-clamp-1 mb-0.5">
                      {item.novelTitle}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Chapter {item.chapterNumber} of {item.totalChapters}
                    </p>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${item.progressPercent}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      {item.progressPercent}% complete
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" className="shrink-0">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {/* Bookmarked tab */}
      {activeTab === "bookmarked" && (
        <div
          className="flex flex-col items-center justify-center py-20 text-muted-foreground rounded-xl border border-dashed border-border"
          data-ocid="library.bookmarked_empty_state"
        >
          <BookMarked className="h-12 w-12 mb-4 opacity-25" />
          <p className="text-base font-semibold">No bookmarked novels</p>
          <p className="text-sm mt-1">
            Bookmark novels while browsing to find them here
          </p>
        </div>
      )}
    </div>
  );
}
