import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export function StarRating({
  rating,
  reviewCount,
  interactive = false,
  onRate,
  size = "md",
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const displayRating = interactive ? selected || rating : rating;
  const activeIndex = interactive ? hovered || selected || 0 : 0;

  function handleClick(n: number) {
    if (!interactive) return;
    setSelected(n);
    onRate?.(n);
  }

  return (
    <div
      className="flex items-center gap-1.5"
      data-ocid="star_rating.container"
    >
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => {
          const filled = interactive
            ? n <= activeIndex
            : n <= Math.round(displayRating);
          const partial =
            !interactive &&
            n === Math.ceil(displayRating) &&
            displayRating % 1 !== 0;
          return (
            <button
              key={n}
              type="button"
              aria-label={interactive ? `Rate ${n} stars` : undefined}
              className={[
                sizeClasses[size],
                "relative transition-transform duration-150",
                interactive
                  ? "cursor-pointer hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded-sm"
                  : "cursor-default",
              ].join(" ")}
              onMouseEnter={() => interactive && setHovered(n)}
              onMouseLeave={() => interactive && setHovered(0)}
              onClick={() => handleClick(n)}
              onKeyDown={(e) => e.key === "Enter" && handleClick(n)}
              data-ocid={interactive ? `star_rating.star.${n}` : undefined}
            >
              {partial ? (
                <span className="relative inline-block">
                  <Star
                    className={`${sizeClasses[size]} text-muted-foreground/40`}
                  />
                  <span
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${(displayRating % 1) * 100}%` }}
                  >
                    <Star
                      className={`${sizeClasses[size]} fill-secondary text-secondary`}
                    />
                  </span>
                </span>
              ) : (
                <Star
                  className={[
                    sizeClasses[size],
                    filled
                      ? "fill-secondary text-secondary"
                      : "text-muted-foreground/40",
                  ].join(" ")}
                />
              )}
            </button>
          );
        })}
      </div>
      <span className={`font-semibold font-display ${textSize[size]}`}>
        {displayRating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span
          className={`text-muted-foreground ${textSize[size]}`}
        >{`(${reviewCount.toLocaleString()})`}</span>
      )}
    </div>
  );
}
