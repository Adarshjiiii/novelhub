import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ReadingProgress } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, Clock } from "lucide-react";

interface ReadingHistoryItemProps {
  item: ReadingProgress;
  author?: string;
  genre?: string;
  index: number;
}

function formatLastRead(ts: number): string {
  const diff = Date.now() - ts;
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function ReadingHistoryItem({
  item,
  author,
  genre,
  index,
}: ReadingHistoryItemProps) {
  const isCompleted = item.progressPercent >= 100;

  return (
    <div
      className="card-elevated p-4 flex gap-4 hover:shadow-xl transition-smooth"
      data-ocid={`profile.history_item.${index}`}
    >
      {/* Cover */}
      <Link
        to="/novel/$id"
        params={{ id: item.novelId }}
        className="shrink-0"
        aria-label={`View ${item.novelTitle}`}
      >
        <div className="w-16 h-24 rounded-lg overflow-hidden bg-muted border border-border shadow-md">
          <img
            src={item.novelCover}
            alt={item.novelTitle}
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link
            to="/novel/$id"
            params={{ id: item.novelId }}
            className="hover:text-primary transition-colors"
          >
            <h3 className="font-display font-semibold text-sm leading-snug line-clamp-1">
              {item.novelTitle}
            </h3>
          </Link>
          {isCompleted ? (
            <Badge
              variant="secondary"
              className="shrink-0 gap-1 text-[10px] bg-accent/10 text-accent border-accent/20"
            >
              <CheckCircle2 className="h-3 w-3" />
              Completed
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="shrink-0 text-[10px] text-primary border-primary/30"
            >
              In Progress
            </Badge>
          )}
        </div>

        {author && <p className="text-xs text-muted-foreground">{author}</p>}
        {genre && (
          <span className="badge-accent text-[10px] mt-0.5 inline-block">
            {genre}
          </span>
        )}

        {/* Progress bar */}
        <div className="mt-2.5 mb-1.5">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
            <span>
              Ch. {item.chapterNumber} / {item.totalChapters}
            </span>
            <span className="font-medium text-foreground/80">
              {item.progressPercent}%
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted ? "bg-accent" : "bg-primary"
              }`}
              style={{ width: `${Math.min(item.progressPercent, 100)}%` }}
              role="progressbar"
              tabIndex={-1}
              aria-valuenow={item.progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatLastRead(item.lastReadAt)}
          </span>
          {!isCompleted && (
            <Link to="/novel/$id" params={{ id: item.novelId }}>
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-[10px] px-2 gap-1 text-primary border-primary/30 hover:bg-primary/10"
                data-ocid={`profile.resume_button.${index}`}
              >
                <BookOpen className="h-3 w-3" />
                Resume
              </Button>
            </Link>
          )}
          {isCompleted && (
            <Link to="/novel/$id" params={{ id: item.novelId }}>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 text-[10px] px-2 gap-1 text-muted-foreground hover:text-foreground"
                data-ocid={`profile.reread_button.${index}`}
              >
                Re-read
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
