import { ActivityFeed } from "@/components/ActivityFeed";
import { FriendCard } from "@/components/FriendCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFriends } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { MOCK_USERS } from "@/lib/mockData";
import type { Friend } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle,
  Search,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const FRIEND_REQUESTS = [
  {
    id: "r1",
    from: "nova_reader",
    displayName: "Nova R.",
    avatar: "NR",
    mutualFriends: 3,
  },
  {
    id: "r2",
    from: "eli_writes",
    displayName: "Eli W.",
    avatar: "EW",
    mutualFriends: 1,
  },
];

const DISCOVER_USERS = [
  {
    id: "d1",
    username: "priya_reads",
    displayName: "Priya S.",
    avatar: "PS",
    mutualFriends: 5,
  },
  {
    id: "d2",
    username: "luca_m",
    displayName: "Luca M.",
    avatar: "LM",
    mutualFriends: 2,
  },
  {
    id: "d3",
    username: "yuki_writes",
    displayName: "Yuki W.",
    avatar: "YW",
    mutualFriends: 4,
  },
  {
    id: "d4",
    username: "sam_lit",
    displayName: "Sam L.",
    avatar: "SL",
    mutualFriends: 1,
  },
  {
    id: "d5",
    username: "fen_books",
    displayName: "Fen B.",
    avatar: "FB",
    mutualFriends: 6,
  },
];

const AVATAR_COLORS = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary",
  "bg-accent/20 text-accent",
  "bg-[oklch(0.55_0.22_300)]/20 text-[oklch(0.75_0.22_300)]",
  "bg-[oklch(0.55_0.22_20)]/20 text-[oklch(0.75_0.22_20)]",
];

function getAvatarColor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++)
    h = (h * 31 + id.charCodeAt(i)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function FriendListSkeleton() {
  return (
    <div className="space-y-3" data-ocid="friends.loading_state">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card-elevated p-4 flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      ))}
    </div>
  );
}

function PendingRequestsSection() {
  const [requests, setRequests] = useState(FRIEND_REQUESTS);
  if (requests.length === 0) return null;
  const accept = (id: string) =>
    setRequests((r) => r.filter((x) => x.id !== id));
  const decline = (id: string) =>
    setRequests((r) => r.filter((x) => x.id !== id));
  return (
    <div className="mb-6" data-ocid="friends.pending_requests_section">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Pending Requests
        </h2>
        <Badge className="h-4 px-1.5 text-[10px] bg-secondary/20 text-secondary border-secondary/30">
          {requests.length}
        </Badge>
      </div>
      <div className="space-y-2">
        {requests.map((req, i) => (
          <div
            key={req.id}
            className="card-elevated p-4 flex items-center gap-4"
            data-ocid={`friends.request.${i + 1}`}
          >
            <div
              className={`h-11 w-11 rounded-full flex items-center justify-center font-display text-sm font-bold shrink-0 ${getAvatarColor(req.id)}`}
            >
              {req.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{req.displayName}</p>
              <p className="text-xs text-muted-foreground">
                @{req.from} · {req.mutualFriends} mutual friends
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                size="sm"
                className="gap-1 h-8 text-xs"
                onClick={() => accept(req.id)}
                data-ocid={`friends.accept_button.${i + 1}`}
              >
                <CheckCircle className="h-3.5 w-3.5" /> Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1 h-8 text-xs"
                onClick={() => decline(req.id)}
                data-ocid={`friends.decline_button.${i + 1}`}
              >
                <XCircle className="h-3.5 w-3.5" /> Decline
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Separator className="mt-6" />
    </div>
  );
}

function AddFriendSection() {
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState<Set<string>>(new Set());
  const mockResults = query.trim()
    ? MOCK_USERS.filter(
        (u) =>
          u.username.toLowerCase().includes(query.toLowerCase()) ||
          u.displayName.toLowerCase().includes(query.toLowerCase()),
      ).map((u) => ({ ...u, mutualFriends: 0 }))
    : [];
  const discoverFiltered = DISCOVER_USERS.filter(
    (u) =>
      !query.trim() ||
      u.username.toLowerCase().includes(query.toLowerCase()) ||
      u.displayName.toLowerCase().includes(query.toLowerCase()),
  );
  const combined = [...mockResults, ...discoverFiltered];
  return (
    <div data-ocid="friends.discover_section">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by username…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
          data-ocid="friends.add_search_input"
        />
      </div>
      {combined.length === 0 ? (
        <div
          className="flex flex-col items-center py-12 text-muted-foreground"
          data-ocid="friends.discover_empty_state"
        >
          <Users className="h-12 w-12 mb-3 opacity-25" />
          <p className="text-sm font-medium">No users found</p>
          <p className="text-xs mt-1">Try a different username</p>
        </div>
      ) : (
        <div className="space-y-2">
          {combined.map((user, i) => (
            <div
              key={user.id}
              className="card-elevated p-4 flex items-center gap-4"
              data-ocid={`friends.discover_user.${i + 1}`}
            >
              <div
                className={`h-11 w-11 rounded-full flex items-center justify-center font-display text-sm font-bold shrink-0 ${getAvatarColor(user.id)}`}
              >
                {user.avatar || user.displayName.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{user.displayName}</p>
                <p className="text-xs text-muted-foreground">
                  @{user.username}
                  {user.mutualFriends > 0
                    ? ` · ${user.mutualFriends} mutual friends`
                    : ""}
                </p>
              </div>
              <Button
                size="sm"
                variant={sent.has(user.id) ? "outline" : "default"}
                className="gap-1.5 h-8 text-xs shrink-0"
                onClick={() => setSent((s) => new Set([...s, user.id]))}
                disabled={sent.has(user.id)}
                data-ocid={`friends.add_button.${i + 1}`}
              >
                {sent.has(user.id) ? (
                  <CheckCircle className="h-3.5 w-3.5" />
                ) : (
                  <UserPlus className="h-3.5 w-3.5" />
                )}
                {sent.has(user.id) ? "Sent" : "Add Friend"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FriendsPage() {
  const { principal, isAuthenticated } = useAuth();
  const { data: friends = [], isLoading } = useFriends(principal ?? undefined);
  const [search, setSearch] = useState("");
  const [friendList, setFriendList] = useState<Friend[] | null>(null);
  const activeFriends: Friend[] = friendList ?? friends;
  const filtered = activeFriends.filter(
    (f) =>
      f.displayName.toLowerCase().includes(search.toLowerCase()) ||
      f.username.toLowerCase().includes(search.toLowerCase()),
  );
  const onlineCount = activeFriends.filter((f) => f.isOnline).length;
  const handleRemove = (id: string) => {
    const base = friendList ?? friends;
    setFriendList(base.filter((f) => f.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24"
        data-ocid="friends.auth_gate"
      >
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-5">
          <Users className="h-10 w-10 text-muted-foreground opacity-40" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">
          Join the Community
        </h2>
        <p className="text-muted-foreground text-sm mb-6 text-center max-w-xs">
          Sign in to connect with fellow readers, see what your friends are
          reading, and share your journey.
        </p>
        <Link to="/login">
          <Button size="lg" className="gap-2" data-ocid="friends.login_button">
            <Users className="h-4 w-4" /> Sign In to Continue
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div data-ocid="friends.page">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1 flex items-center gap-2">
            Friends
            <Badge className="bg-primary/20 text-primary border-primary/30 font-mono text-xs">
              {activeFriends.length}
            </Badge>
          </h1>
          <p className="text-muted-foreground text-sm">
            {onlineCount} online now · {activeFriends.length - onlineCount}{" "}
            offline
          </p>
        </div>
      </div>

      <PendingRequestsSection />

      <Tabs defaultValue="all">
        <TabsList className="bg-muted mb-5">
          <TabsTrigger value="all" data-ocid="friends.all_tab">
            My Friends
            {activeFriends.length > 0 && (
              <Badge className="ml-1.5 h-4 px-1.5 text-[10px] bg-primary/20 text-primary border-primary/30">
                {activeFriends.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="activity" data-ocid="friends.activity_tab">
            Activity
          </TabsTrigger>
          <TabsTrigger value="discover" data-ocid="friends.discover_tab">
            Add Friends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search friends…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-ocid="friends.search_input"
              />
            </div>
          </div>
          {isLoading ? (
            <FriendListSkeleton />
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-muted-foreground"
              data-ocid="friends.empty_state"
            >
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Users className="h-8 w-8 opacity-30" />
              </div>
              <p className="text-base font-semibold">No friends yet</p>
              <p className="text-sm mt-1 mb-5">
                Start by adding people from the library!
              </p>
              <Link to="/library">
                <Button
                  variant="outline"
                  className="gap-2"
                  data-ocid="friends.go_library_button"
                >
                  <BookOpen className="h-4 w-4" /> Browse Library
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((friend, i) => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  index={i + 1}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="activity">
          <h2 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Friend Activity
          </h2>
          {isLoading ? (
            <div
              className="space-y-2"
              data-ocid="friends.activity_loading_state"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="card-elevated p-3 flex items-center gap-3"
                >
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-12 w-9 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ActivityFeed friends={activeFriends} />
          )}
        </TabsContent>

        <TabsContent value="discover">
          <AddFriendSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
