import { Badge } from "@/components/ui/badge";
import type { Novel } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookOpen, Eye, Star } from "lucide-react";

interface NovelCardProps {
  novel: Novel;
  rank?: number;
  size?: "sm" | "md" | "lg";
  dataOcid?: string;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function NovelCard({
  novel,
  rank,
  size = "md",
  dataOcid,
}: NovelCardProps) {
  const isSmall = size === "sm";
  const isLarge = size === "lg";

  return (
    <Link
      to="/novel/$id"
      params={{ id: novel.id }}
      className="group block"
      data-ocid={dataOcid}
    >
      <div
        className={`relative rounded-xl overflow-hidden border border-border bg-card ${
          isLarge ? "" : ""
        } hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]`}
      >
        {/* Cover */}
        <div
          className={`relative overflow-hidden ${
            isSmall ? "aspect-[2/3]" : isLarge ? "aspect-[3/4]" : "aspect-[2/3]"
          } bg-muted`}
        >
          <img
            src={novel.coverImage}
            alt={novel.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Rank badge */}
          {rank !== undefined && (
            <div
              className={`absolute top-2 left-2 w-7 h-7 flex items-center justify-center rounded-full font-display font-black text-xs ${
                rank === 1
                  ? "bg-secondary text-secondary-foreground"
                  : rank === 2
                    ? "bg-muted-foreground/80 text-foreground"
                    : rank === 3
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-black/60 text-white"
              }`}
            >
              {rank}
            </div>
          )}

          {/* Status badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
            {novel.isHot && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-destructive/90 text-white">
                🔥 HOT
              </span>
            )}
            {novel.isNew && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-accent/90 text-accent-foreground">
                NEW
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="absolute bottom-2 right-2">
            <span className="flex items-center gap-0.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              <Star className="h-2.5 w-2.5 fill-secondary text-secondary" />
              {novel.rating}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className={`${isSmall ? "p-2" : "p-3"}`}>
          <p
            className={`font-display font-semibold leading-snug line-clamp-2 ${
              isSmall ? "text-xs" : "text-sm"
            }`}
          >
            {novel.title}
          </p>
          <p
            className={`text-muted-foreground truncate mt-0.5 ${
              isSmall ? "text-[10px]" : "text-xs"
            }`}
          >
            {novel.author}
          </p>

          {!isSmall && (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {novel.genre.slice(0, 1).map((g) => (
                <Badge
                  key={g}
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 border-primary/40 text-primary"
                >
                  {g}
                </Badge>
              ))}
              <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground ml-auto">
                <Eye className="h-3 w-3" />
                {formatCount(novel.views)}
              </span>
            </div>
          )}

          {isLarge && (
            <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {novel.chapterCount} ch
              </span>
              <span className="capitalize">{novel.status}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
