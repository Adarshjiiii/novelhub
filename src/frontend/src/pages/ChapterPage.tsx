import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useChapter, useChapters, useNovel } from "@/hooks/useApi";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Minus,
  Moon,
  Plus,
  Sun,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FontSize = "sm" | "md" | "lg";
type ReadingTheme = "dark" | "light" | "sepia";

const FONT_SIZE_CLASSES: Record<FontSize, string> = {
  sm: "text-base leading-7",
  md: "text-lg leading-8",
  lg: "text-xl leading-9",
};

const THEME_CLASSES: Record<ReadingTheme, string> = {
  dark: "bg-background text-foreground",
  light: "bg-[oklch(0.97_0_0)] text-[oklch(0.1_0_0)]",
  sepia: "bg-[oklch(0.92_0.04_75)] text-[oklch(0.18_0.05_55)]",
};

export default function ChapterPage() {
  const { novelId, chapterId } = useParams({ strict: false }) as {
    novelId: string;
    chapterId: string;
  };
  const { data: novel } = useNovel(novelId);
  const { data: chapters = [] } = useChapters(novelId);
  const { data: chapter, isLoading } = useChapter(novelId, chapterId);

  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [readingTheme, setReadingTheme] = useState<ReadingTheme>("dark");
  const contentRef = useRef<HTMLDivElement>(null);

  const currentIdx = chapters.findIndex((c) => c.id === chapterId);
  const prevChapter = currentIdx > 0 ? chapters[currentIdx - 1] : null;
  const nextChapter =
    currentIdx >= 0 && currentIdx < chapters.length - 1
      ? chapters[currentIdx + 1]
      : null;

  // Auto-save progress when navigating away
  useEffect(() => {
    return () => {
      if (chapter) {
        localStorage.setItem(
          `progress-${novelId}`,
          JSON.stringify({
            chapterId,
            chapterNumber: chapter.chapterNumber,
            savedAt: Date.now(),
          }),
        );
      }
    };
  }, [chapter, chapterId, novelId]);

  // Scroll to top on chapter change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function cycleFontSize() {
    const order: FontSize[] = ["sm", "md", "lg"];
    const idx = order.indexOf(fontSize);
    setFontSize(order[(idx + 1) % order.length]);
  }

  function cycleTheme() {
    const order: ReadingTheme[] = ["dark", "light", "sepia"];
    const idx = order.indexOf(readingTheme);
    setReadingTheme(order[(idx + 1) % order.length]);
  }

  if (isLoading) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-8 space-y-4"
        data-ocid="chapter.loading_state"
      >
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <div className="space-y-3 mt-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton
              key={i}
              className={`h-4 w-${i % 2 === 0 ? "full" : "5/6"}`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 text-muted-foreground"
        data-ocid="chapter.error_state"
      >
        <BookOpen className="h-16 w-16 mb-4 opacity-30" />
        <h2 className="font-display text-xl font-bold mb-2">
          Chapter Not Found
        </h2>
        <p className="text-sm mb-4">
          This chapter doesn't exist or was removed.
        </p>
        <Link to="/novel/$id" params={{ id: novelId }}>
          <Button data-ocid="chapter.back_button">Back to Novel</Button>
        </Link>
      </div>
    );
  }

  const progressPct =
    chapters.length > 0 ? ((currentIdx + 1) / chapters.length) * 100 : 0;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${THEME_CLASSES[readingTheme]}`}
      data-ocid="chapter.page"
    >
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-border">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Toolbar */}
      <div className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center gap-3">
          <Link
            to="/novel/$id"
            params={{ id: novelId }}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mr-auto"
            data-ocid="chapter.back_to_novel_link"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline truncate max-w-40">
              {novel?.title ?? "Novel"}
            </span>
          </Link>

          {/* Font size controls */}
          <div className="flex items-center gap-1 border border-border rounded-lg p-0.5">
            <button
              type="button"
              aria-label="Decrease font size"
              className="p-1.5 rounded hover:bg-muted transition-colors disabled:opacity-40"
              onClick={() =>
                fontSize !== "sm" &&
                setFontSize(fontSize === "lg" ? "md" : "sm")
              }
              disabled={fontSize === "sm"}
              data-ocid="chapter.font_decrease_button"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Font size"
              className="px-2 py-1 text-xs font-mono hover:bg-muted rounded transition-colors"
              onClick={cycleFontSize}
              data-ocid="chapter.font_size_toggle"
            >
              {fontSize.toUpperCase()}
            </button>
            <button
              type="button"
              aria-label="Increase font size"
              className="p-1.5 rounded hover:bg-muted transition-colors disabled:opacity-40"
              onClick={() =>
                fontSize !== "lg" &&
                setFontSize(fontSize === "sm" ? "md" : "lg")
              }
              disabled={fontSize === "lg"}
              data-ocid="chapter.font_increase_button"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            aria-label={`Switch to ${readingTheme === "dark" ? "light" : readingTheme === "light" ? "sepia" : "dark"} mode`}
            className="p-2 rounded-lg hover:bg-muted transition-colors border border-border"
            onClick={cycleTheme}
            data-ocid="chapter.theme_toggle"
          >
            {readingTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : readingTheme === "light" ? (
              <span className="text-xs font-semibold">S</span>
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Main reading area */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-20">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-muted-foreground mb-6"
          aria-label="breadcrumb"
        >
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            to="/novel/$id"
            params={{ id: novelId }}
            className="hover:text-foreground transition-colors truncate max-w-32"
          >
            {novel?.title ?? "Novel"}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate max-w-32">Ch. {chapter.chapterNumber}</span>
        </nav>

        {/* Chapter header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Chapter {chapter.chapterNumber}</span>
            <span className="text-border">·</span>
            <span>{chapter.wordCount.toLocaleString()} words</span>
            {chapters.length > 0 && (
              <>
                <span className="text-border">·</span>
                <span>
                  {currentIdx + 1} of {chapters.length}
                </span>
              </>
            )}
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold leading-tight">
            {chapter.title}
          </h1>
        </div>

        {/* Top navigation */}
        <div
          className="flex items-center gap-2 mb-8"
          data-ocid="chapter.nav_top"
        >
          {prevChapter ? (
            <Link
              to="/chapter/$novelId/$chapterId"
              params={{ novelId, chapterId: prevChapter.id }}
              data-ocid="chapter.prev_button"
            >
              <Button variant="outline" size="sm" className="gap-1.5">
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
            </Link>
          ) : (
            <Button variant="outline" size="sm" disabled className="gap-1.5">
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
          )}
          <Link
            to="/novel/$id"
            params={{ id: novelId }}
            className="flex-1 text-center"
            data-ocid="chapter.chapter_list_link"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground w-full"
            >
              All Chapters
            </Button>
          </Link>
          {nextChapter ? (
            <Link
              to="/chapter/$novelId/$chapterId"
              params={{ novelId, chapterId: nextChapter.id }}
              data-ocid="chapter.next_button"
            >
              <Button variant="outline" size="sm" className="gap-1.5">
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button variant="outline" size="sm" disabled className="gap-1.5">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Separator className="mb-8 opacity-30" />

        {/* Chapter content */}
        <div
          ref={contentRef}
          className={`font-body prose max-w-none ${FONT_SIZE_CLASSES[fontSize]}`}
          style={{ fontFamily: "var(--font-body)" }}
          data-ocid="chapter.content"
        >
          {chapter.content
            .split("\n\n")
            .slice(0, 60)
            .map((para) => {
              const paraKey = para.trimStart().slice(0, 50);
              return (
                <p key={paraKey} className="mb-5 text-inherit opacity-90">
                  {para}
                </p>
              );
            })}
        </div>

        <Separator className="my-10 opacity-30" />

        {/* Bottom navigation */}
        <div className="flex items-center gap-3" data-ocid="chapter.nav_bottom">
          {prevChapter ? (
            <Link
              to="/chapter/$novelId/$chapterId"
              params={{ novelId, chapterId: prevChapter.id }}
              className="flex-1"
              data-ocid="chapter.prev_bottom_button"
            >
              <Button variant="outline" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="truncate min-w-0">{prevChapter.title}</span>
              </Button>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextChapter ? (
            <Link
              to="/chapter/$novelId/$chapterId"
              params={{ novelId, chapterId: nextChapter.id }}
              className="flex-1"
              data-ocid="chapter.next_bottom_button"
            >
              <Button className="w-full gap-2 button-primary">
                <span className="truncate min-w-0">{nextChapter.title}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Button>
            </Link>
          ) : (
            <Link
              to="/novel/$id"
              params={{ id: novelId }}
              className="flex-1"
              data-ocid="chapter.finished_link"
            >
              <Button variant="outline" className="w-full gap-2">
                <BookOpen className="h-4 w-4" /> Back to Novel
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
