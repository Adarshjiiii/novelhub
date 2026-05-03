import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFriends } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import { BookMarked, CircleDot, Clock, Star, TrendingUp } from "lucide-react";

export function FriendSidebar() {
  const { principal, isAuthenticated } = useAuth();
  const { data: friends, isLoading } = useFriends(principal ?? undefined);

  if (!isAuthenticated) {
    return (
      <aside className="hidden xl:flex w-64 shrink-0 flex-col gap-4">
        <div className="card-elevated p-4">
          <p className="text-sm text-muted-foreground mb-3">
            Sign in to see your friends and their activity.
          </p>
          <Link to="/login">
            <Button
              size="sm"
              className="w-full"
              data-ocid="sidebar.login_button"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="hidden xl:flex w-64 shrink-0 flex-col gap-4"
      data-ocid="sidebar.panel"
    >
      {/* Friends Activity */}
      <div className="card-elevated p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-sm font-semibold">Active Friends</h3>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-[--color-online] animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 min-w-0 space-y-1.5">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3" data-ocid="sidebar.friends_list">
            {friends?.map((friend, i) => (
              <div
                key={friend.id}
                className="flex items-start gap-3"
                data-ocid={`sidebar.friend.${i + 1}`}
              >
                <div className="relative shrink-0">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-display text-sm font-bold text-foreground">
                    {friend.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${
                      friend.isOnline
                        ? "bg-[--color-online]"
                        : "bg-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {friend.displayName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {friend.currentActivity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          to="/friends"
          className="mt-4 flex items-center justify-center gap-1 text-xs text-primary hover:underline"
          data-ocid="sidebar.see_all_friends_link"
        >
          See all friends →
        </Link>
      </div>

      {/* Quick Links */}
      <div className="card-elevated p-4">
        <h3 className="font-display text-sm font-semibold mb-3">
          Quick Access
        </h3>
        <nav className="space-y-1">
          {[
            { to: "/", icon: TrendingUp, label: "Top 5 Rankings" },
            { to: "/library", icon: BookMarked, label: "My Library" },
            { to: "/library", icon: Clock, label: "Continue Reading" },
            { to: "/library", icon: Star, label: "Bookmarked" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export function NavSidebar() {
  return (
    <aside className="hidden lg:flex xl:hidden w-56 shrink-0 flex-col gap-2">
      <nav className="card-elevated p-3 space-y-1">
        {[
          { to: "/", icon: TrendingUp, label: "Home" },
          { to: "/library", icon: BookMarked, label: "My Library" },
          { to: "/friends", icon: CircleDot, label: "Friends" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            activeProps={{ className: "text-foreground bg-muted" }}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
