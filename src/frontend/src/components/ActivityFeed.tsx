import type { Friend } from "@/types";
import {
  BookMarked,
  BookOpen,
  CheckCircle,
  Heart,
  Library,
} from "lucide-react";

export interface ActivityItem {
  id: string;
  friendId: string;
  friendName: string;
  friendAvatar: string;
  action: "reading" | "started" | "finished" | "liked" | "added";
  novelTitle: string;
  novelCover: string;
  timestamp: number;
}

const ACTION_META: Record<
  ActivityItem["action"],
  { label: string; icon: React.ElementType; color: string }
> = {
  reading: { label: "is reading", icon: BookOpen, color: "text-primary" },
  started: { label: "started", icon: BookMarked, color: "text-accent" },
  finished: { label: "finished", icon: CheckCircle, color: "text-green-500" },
  liked: { label: "liked", icon: Heart, color: "text-secondary" },
  added: {
    label: "added to library",
    icon: Library,
    color: "text-muted-foreground",
  },
};

function formatTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

const AVATAR_COLORS = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary",
  "bg-accent/20 text-accent",
  "bg-[oklch(0.55_0.22_300)]/20 text-[oklch(0.75_0.22_300)]",
];

function avatarColor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 4;
  return AVATAR_COLORS[h];
}

function buildActivityFromFriends(friends: Friend[]): ActivityItem[] {
  const items: ActivityItem[] = [];
  const actions: ActivityItem["action"][] = [
    "reading",
    "started",
    "finished",
    "liked",
    "added",
  ];
  friends.forEach((f, fi) => {
    if (!f.currentlyReading) return;
    items.push({
      id: `act-${f.id}-0`,
      friendId: f.id,
      friendName: f.displayName,
      friendAvatar: f.avatar,
      action: actions[fi % actions.length],
      novelTitle: f.currentlyReading,
      novelCover: "/assets/generated/novelhub-hero.dim_1200x600.jpg",
      timestamp: f.lastActive,
    });
  });
  return items.sort((a, b) => b.timestamp - a.timestamp);
}

interface ActivityFeedProps {
  friends: Friend[];
}

export function ActivityFeed({ friends }: ActivityFeedProps) {
  const activities = buildActivityFromFriends(friends);

  if (activities.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-10 text-muted-foreground"
        data-ocid="friends.activity_empty_state"
      >
        <BookOpen className="h-10 w-10 mb-3 opacity-25" />
        <p className="text-sm font-medium">No activity yet</p>
        <p className="text-xs mt-1">
          Activity will appear when friends start reading
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-ocid="friends.activity_feed">
      {activities.map((item, i) => {
        const meta = ACTION_META[item.action];
        const Icon = meta.icon;
        return (
          <div
            key={item.id}
            className="card-elevated p-3 flex items-center gap-3"
            data-ocid={`friends.activity_item.${i + 1}`}
          >
            {/* Friend avatar */}
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center font-display text-xs font-bold shrink-0 ${avatarColor(
                item.friendId,
              )}`}
            >
              {item.friendAvatar}
            </div>

            {/* Novel cover */}
            <div className="h-12 w-9 rounded overflow-hidden shrink-0 bg-muted">
              <img
                src={item.novelCover}
                alt={item.novelTitle}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-semibold text-foreground">
                  {item.friendName}
                </span>{" "}
                <span className={`${meta.color} font-medium`}>
                  {meta.label}
                </span>{" "}
                <span className="font-medium text-foreground truncate">
                  {item.novelTitle}
                </span>
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Icon className={`h-3 w-3 ${meta.color}`} />
                <span className="text-xs text-muted-foreground">
                  {formatTime(item.timestamp)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
