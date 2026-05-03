import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sublabel?: string;
  accent?: "primary" | "secondary" | "accent";
  "data-ocid"?: string;
}

export function StatsCard({
  icon: Icon,
  label,
  value,
  sublabel,
  accent = "primary",
  "data-ocid": ocid,
}: StatsCardProps) {
  const accentClass = {
    primary: "text-primary bg-primary/10 border-primary/20",
    secondary: "text-secondary bg-secondary/10 border-secondary/20",
    accent: "text-accent bg-accent/10 border-accent/20",
  }[accent];

  const iconBg = {
    primary: "bg-primary/15",
    secondary: "bg-secondary/15",
    accent: "bg-accent/15",
  }[accent];

  const iconText = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  }[accent];

  return (
    <div
      className={`rounded-xl border p-4 flex items-start gap-4 bg-card transition-smooth hover:shadow-lg ${accentClass}`}
      data-ocid={ocid}
    >
      <div className={`rounded-lg p-2.5 shrink-0 ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconText}`} />
      </div>
      <div className="min-w-0">
        <p className="font-display text-2xl font-bold text-foreground leading-none">
          {value}
        </p>
        <p className="text-sm font-medium text-foreground/80 mt-1">{label}</p>
        {sublabel && (
          <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
