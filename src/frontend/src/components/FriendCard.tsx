import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Friend } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, MessageCircle, UserMinus } from "lucide-react";
import { useState } from "react";

const AVATAR_COLORS = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary",
  "bg-accent/20 text-accent",
  "bg-[oklch(0.55_0.22_300)]/20 text-[oklch(0.75_0.22_300)]",
  "bg-[oklch(0.55_0.22_20)]/20 text-[oklch(0.75_0.22_20)]",
];

function getAvatarColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % AVATAR_COLORS.length;
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function formatLastSeen(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

interface FriendCardProps {
  friend: Friend;
  index: number;
  onRemove?: (id: string) => void;
}

export function FriendCard({ friend, index, onRemove }: FriendCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const avatarColor = getAvatarColor(friend.id);

  return (
    <>
      <div
        className="card-elevated p-4 flex items-center gap-4 group"
        data-ocid={`friends.item.${index}`}
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center font-display text-base font-bold ${avatarColor}`}
          >
            {friend.avatar}
          </div>
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card ${
              friend.isOnline ? "bg-green-500" : "bg-muted"
            }`}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-medium text-foreground">{friend.displayName}</p>
            <span className="text-xs text-muted-foreground">
              @{friend.username}
            </span>
          </div>

          {friend.currentlyReading ? (
            <div className="flex items-center gap-1 mt-0.5">
              <BookOpen className="h-3 w-3 text-primary shrink-0" />
              <span className="text-xs text-muted-foreground truncate">
                Currently reading:{" "}
                <span className="text-foreground font-medium">
                  {friend.currentlyReading}
                </span>
              </span>
            </div>
          ) : null}

          <div className="flex items-center gap-1 mt-0.5">
            {friend.isOnline ? (
              <Badge className="h-4 px-1.5 text-[10px] bg-green-500/15 text-green-400 border-green-500/30">
                Online
              </Badge>
            ) : (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatLastSeen(friend.lastActive)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-smooth">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Message"
            data-ocid={`friends.message_button.${index}`}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Link to="/profile">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              data-ocid={`friends.profile_button.${index}`}
            >
              View
            </Button>
          </Link>
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/10"
              aria-label="Remove friend"
              data-ocid={`friends.delete_button.${index}`}
              onClick={() => setShowConfirm(true)}
            >
              <UserMinus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Remove Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent data-ocid={`friends.dialog.${index}`}>
          <DialogHeader>
            <DialogTitle>Remove Friend</DialogTitle>
            <DialogDescription>
              Remove{" "}
              <span className="font-semibold text-foreground">
                {friend.displayName}
              </span>{" "}
              from your friends list? They won't be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              data-ocid={`friends.cancel_button.${index}`}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onRemove?.(friend.id);
                setShowConfirm(false);
              }}
              data-ocid={`friends.confirm_button.${index}`}
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
