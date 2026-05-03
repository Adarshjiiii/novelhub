interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md";
  color?: "primary" | "accent" | "secondary";
}

export function ProgressBar({
  value,
  max = 100,
  className = "",
  showLabel = false,
  size = "sm",
  color = "primary",
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const heightClass = size === "sm" ? "h-1.5" : "h-2.5";
  const colorClass =
    color === "primary"
      ? "bg-primary"
      : color === "accent"
        ? "bg-accent"
        : "bg-secondary";

  return (
    <div className={className}>
      <div
        className={`relative ${heightClass} bg-muted rounded-full overflow-hidden`}
        role="progressbar"
        tabIndex={-1}
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`absolute inset-y-0 left-0 ${colorClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-[10px] text-muted-foreground mt-1">
          {Math.round(pct)}%
        </p>
      )}
    </div>
  );
}
