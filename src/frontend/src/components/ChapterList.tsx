import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Chapter, ReadingProgress } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookOpen, ChevronRight, Clock, Lock } from "lucide-react";

interface ChapterListProps {
  chapters: Chapter[];
  novelId: string;
  isLoading?: boolean;
  progress?: ReadingProgress | null;
}

function formatWordCount(wc: number): string {
  if (wc >= 1000) return `${(wc / 1000).toFixed(1)}K words`;
  return `${wc} words`;
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export function ChapterList({
  chapters,
  novelId,
  isLoading,
  progress,
}: ChapterListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2" data-ocid="chapter_list.loading_state">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!chapters.length) {
    return (
      <div
        className="flex flex-col items-center py-10 text-muted-foreground"
        data-ocid="chapter_list.empty_state"
      >
        <BookOpen className="h-10 w-10 mb-3 opacity-30" />
        <p className="text-sm">No chapters available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1" data-ocid="chapter_list.list">
      {chapters.map((ch, idx) => {
        const isRead = progress && progress.chapterNumber >= ch.chapterNumber;
        const isCurrent = progress && progress.chapterId === ch.id;

        return (
          <div
            key={ch.id}
            className={[
              "group flex items-center justify-between px-3 py-2.5 rounded-lg transition-smooth",
              ch.isLocked
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-muted/60 cursor-pointer",
              isCurrent ? "bg-primary/10 border border-primary/30" : "",
            ].join(" ")}
            data-ocid={`chapter_list.item.${idx + 1}`}
          >
            {ch.isLocked ? (
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-xs text-muted-foreground w-7 shrink-0 font-mono">
                  #{ch.chapterNumber}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{ch.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatWordCount(ch.wordCount)} · {timeAgo(ch.publishedAt)}
                  </p>
                </div>
                <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </div>
            ) : (
              <Link
                to="/chapter/$novelId/$chapterId"
                params={{ novelId, chapterId: ch.id }}
                className="flex items-center gap-3 flex-1 min-w-0"
                data-ocid={`chapter_list.link.${idx + 1}`}
              >
                <span
                  className={[
                    "text-xs w-7 shrink-0 font-mono",
                    isRead ? "text-primary" : "text-muted-foreground",
                  ].join(" ")}
                >
                  #{ch.chapterNumber}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className={[
                        "text-sm font-medium truncate",
                        isRead ? "text-muted-foreground" : "",
                      ].join(" ")}
                    >
                      {ch.title}
                    </p>
                    {isCurrent && (
                      <Badge className="badge-accent text-xs py-0 shrink-0">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {formatWordCount(ch.wordCount)} · {timeAgo(ch.publishedAt)}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth shrink-0" />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface ResumeButtonProps {
  progress: ReadingProgress;
  novelId: string;
}

export function ResumeButton({ progress, novelId }: ResumeButtonProps) {
  return (
    <Link
      to="/chapter/$novelId/$chapterId"
      params={{ novelId, chapterId: progress.chapterId }}
    >
      <Button
        className="w-full gap-2 button-primary"
        data-ocid="chapter_list.resume_button"
      >
        <BookOpen className="h-4 w-4" />
        Resume Chapter {progress.chapterNumber}
      </Button>
    </Link>
  );
}
