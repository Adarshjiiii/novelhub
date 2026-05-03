import type { RankedNovel } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookOpen, Eye, Star, TrendingUp } from "lucide-react";

interface RankingCardProps {
  novel: RankedNovel;
  isActive?: boolean;
  onClick?: () => void;
  dataOcid?: string;
}

const RANK_STYLES: Record<
  number,
  { glow: string; badge: string; label: string }
> = {
  1: {
    glow: "shadow-secondary/30 border-secondary/60",
    badge: "bg-secondary text-secondary-foreground",
    label: "#1 TRENDING",
  },
  2: {
    glow: "shadow-accent/20 border-accent/40",
    badge: "bg-accent/90 text-accent-foreground",
    label: "TOP PICK",
  },
  3: {
    glow: "shadow-primary/20 border-primary/40",
    badge: "bg-primary/80 text-primary-foreground",
    label: "MUST READ",
  },
  4: {
    glow: "shadow-primary/10 border-primary/30",
    badge: "bg-primary/60 text-primary-foreground",
    label: "MUST READ",
  },
  5: {
    glow: "shadow-muted",
    badge: "bg-muted-foreground/70 text-foreground",
    label: "TOP 5",
  },
};

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

export function RankingCard({
  novel,
  isActive,
  onClick,
  dataOcid,
}: RankingCardProps) {
  const styles = RANK_STYLES[novel.rank] ?? RANK_STYLES[5];

  return (
    <div
      className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
        isActive
          ? `${styles.glow} scale-[1.02] shadow-xl`
          : "border-border hover:border-primary/40 hover:shadow-lg"
      }`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      data-ocid={dataOcid}
    >
      <Link to="/novel/$id" params={{ id: novel.id }} className="block">
        <div className="relative aspect-[2/3] bg-muted overflow-hidden">
          <img
            src={novel.coverImage}
            alt={novel.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Status badge */}
          <div className="absolute top-2 left-2">
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${styles.badge}`}
            >
              {novel.badge || styles.label}
            </span>
          </div>

          {/* Rank number */}
          <div className="absolute top-2 right-2">
            <span className="font-display font-black text-xs text-white bg-black/60 rounded px-1.5 py-0.5">
              #{novel.rank}
            </span>
          </div>

          {/* Trending arrow for #1 */}
          {novel.rank === 1 && (
            <div className="absolute top-10 right-2">
              <TrendingUp className="h-4 w-4 text-secondary" />
            </div>
          )}

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-2.5">
            <p className="font-display text-xs font-bold text-white line-clamp-2 leading-tight">
              {novel.title}
            </p>
            <p className="text-[9px] text-white/70 truncate mt-0.5">
              {novel.author} · {novel.genre[0]}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="flex items-center gap-0.5 text-[9px] text-white/80">
                <Star className="h-2.5 w-2.5 fill-secondary text-secondary" />
                {novel.rating}
              </span>
              <span className="flex items-center gap-0.5 text-[9px] text-white/60">
                <Eye className="h-2.5 w-2.5" />
                {formatCount(novel.views)}
              </span>
              <span className="flex items-center gap-0.5 text-[9px] text-white/60">
                <BookOpen className="h-2.5 w-2.5" />
                {novel.chapterCount}ch
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
