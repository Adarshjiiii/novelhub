import { ReadingHistoryItem } from "@/components/ReadingHistoryItem";
import { StatsCard } from "@/components/StatsCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useReadingHistory } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { MOCK_USERS } from "@/lib/mockData";
import type { UserProfile } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  BookMarked,
  BookOpen,
  CheckCircle2,
  Edit3,
  Flame,
  Library,
  Settings,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

interface EditProfileModalProps {
  profile: UserProfile;
  open: boolean;
  onClose: () => void;
  onSave: (updates: Partial<UserProfile>) => void;
}

function EditProfileModal({
  profile,
  open,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [avatarUrl, setAvatarUrl] = useState("");

  function handleSave() {
    if (!displayName.trim() || !username.trim()) {
      toast.error("Name and username are required.");
      return;
    }
    onSave({
      displayName,
      username,
      bio,
      ...(avatarUrl.trim() ? { avatar: avatarUrl.trim() } : {}),
    });
    toast.success("Profile updated!");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="profile.edit_dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 rounded-2xl border-2 border-primary/30">
              <AvatarFallback className="rounded-2xl bg-primary font-display text-xl font-bold text-primary-foreground">
                {profile.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <Label
                htmlFor="avatarUrl"
                className="text-xs text-muted-foreground"
              >
                Avatar URL (optional)
              </Label>
              <Input
                id="avatarUrl"
                placeholder="https://example.com/avatar.jpg"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                data-ocid="profile.avatar_url_input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              data-ocid="profile.display_name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              data-ocid="profile.username_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={3}
              placeholder="Tell the world about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              data-ocid="profile.bio_textarea"
            />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="profile.edit_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              data-ocid="profile.edit_save_button"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditOpen: () => void;
}

function ProfileHeader({ profile, onEditOpen }: ProfileHeaderProps) {
  const joined = new Date(profile.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return (
    <div
      className="card-elevated mb-6 overflow-hidden"
      data-ocid="profile.header"
    >
      <div
        className="h-32 w-full relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.25 0.12 260), oklch(0.20 0.10 180), oklch(0.22 0.08 55))",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.6 0.28 260 / 0.5) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.7 0.18 55 / 0.4) 0%, transparent 40%)",
          }}
        />
      </div>
      <div className="px-6 pb-6">
        <div className="flex items-end justify-between -mt-10 mb-4">
          <Avatar className="h-20 w-20 rounded-2xl border-4 border-card shadow-xl">
            <AvatarFallback className="rounded-2xl bg-primary font-display text-2xl font-bold text-primary-foreground">
              {profile.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex gap-2 pb-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={onEditOpen}
              data-ocid="profile.edit_button"
            >
              <Edit3 className="h-3.5 w-3.5" /> Edit Profile
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Settings"
              data-ocid="profile.settings_button"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-display text-2xl font-bold leading-tight">
              {profile.displayName}
            </h1>
            {profile.isOnline && (
              <span className="flex items-center gap-1 text-[11px] text-accent font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />{" "}
                Online
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">@{profile.username}</p>
          <p className="text-sm mt-2 text-foreground/90 max-w-lg">
            {profile.bio}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Member since {joined}
          </p>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              icon: BookOpen,
              label: "Novels Read",
              value: profile.readingCount,
            },
            { icon: Edit3, label: "Written", value: profile.writingCount },
            { icon: Users, label: "Friends", value: profile.friendCount },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center rounded-lg bg-muted/40 p-2.5"
            >
              <s.icon className="h-4 w-4 mx-auto mb-1 text-primary" />
              <p className="font-display font-bold text-lg leading-none">
                {s.value}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ReadingStatsProps {
  totalNovels: number;
  totalChapters: number;
  favoriteGenre: string;
  streak: number;
}

function ReadingStats({
  totalNovels,
  totalChapters,
  favoriteGenre,
  streak,
}: ReadingStatsProps) {
  return (
    <section className="mb-6" data-ocid="profile.stats_section">
      <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-secondary" /> Reading Stats
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatsCard
          icon={BookMarked}
          label="Novels Read"
          value={totalNovels}
          accent="primary"
          data-ocid="profile.stats_novels"
        />
        <StatsCard
          icon={Library}
          label="Chapters Read"
          value={totalChapters}
          sublabel="across all novels"
          accent="accent"
          data-ocid="profile.stats_chapters"
        />
        <StatsCard
          icon={Star}
          label="Favorite Genre"
          value={favoriteGenre}
          accent="secondary"
          data-ocid="profile.stats_genre"
        />
        <StatsCard
          icon={Flame}
          label="Reading Streak"
          value={`${streak} days`}
          sublabel="Keep it up!"
          accent="primary"
          data-ocid="profile.stats_streak"
        />
      </div>
    </section>
  );
}

const NOVEL_META: Record<string, { author: string; genre: string }> = {
  "1": { author: "Sarah J. Maas", genre: "Fantasy" },
  "2": { author: "Cassandra Clare", genre: "Fantasy" },
  "3": { author: "Tahereh Mafi", genre: "Dystopian" },
  "4": { author: "Leigh Bardugo", genre: "Fantasy" },
  "5": { author: "Marcus Cole", genre: "Romance" },
};

function HistorySkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((k) => (
        <div key={k} className="card-elevated p-4 flex gap-4">
          <Skeleton className="w-16 h-24 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-2 w-full rounded-full mt-2" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface EmptyHistoryProps {
  icon: React.FC<{ className?: string }>;
  message: string;
  sub: string;
  ocid: string;
  cta?: boolean;
}

function EmptyHistory({
  icon: Icon,
  message,
  sub,
  ocid,
  cta,
}: EmptyHistoryProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      data-ocid={ocid}
    >
      <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground opacity-50" />
      </div>
      <p className="font-display font-semibold text-base mb-1">{message}</p>
      <p className="text-sm text-muted-foreground mb-5">{sub}</p>
      {cta && (
        <Link to="/">
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            data-ocid="profile.browse_novels_button"
          >
            <BookOpen className="h-4 w-4" /> Browse Novels
          </Button>
        </Link>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const { isAuthenticated, principal } = useAuth();
  const { data: history, isLoading: histLoading } = useReadingHistory(
    principal ?? undefined,
  );
  const [profileData, setProfileData] = useState<UserProfile>(MOCK_USERS[0]);
  const [editOpen, setEditOpen] = useState(false);

  const inProgress = (history ?? []).filter((h) => h.progressPercent < 100);
  const completed = (history ?? []).filter((h) => h.progressPercent >= 100);
  const totalChapters = (history ?? []).reduce(
    (sum, h) => sum + h.chapterNumber,
    0,
  );

  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 text-center"
        data-ocid="profile.auth_gate"
      >
        <div className="h-20 w-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
          <BookOpen className="h-10 w-10 text-primary opacity-70" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">
          Sign in to view your Profile
        </h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-xs">
          Track your reading progress, manage your library, and connect with
          friends.
        </p>
        <Link to="/login">
          <Button size="lg" data-ocid="profile.login_button">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div data-ocid="profile.page">
      <EditProfileModal
        profile={profileData}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={(updates) =>
          setProfileData((prev) => ({ ...prev, ...updates }))
        }
      />
      <ProfileHeader
        profile={profileData}
        onEditOpen={() => setEditOpen(true)}
      />
      <ReadingStats
        totalNovels={profileData.readingCount}
        totalChapters={totalChapters}
        favoriteGenre="Fantasy"
        streak={7}
      />

      <Tabs defaultValue="current" data-ocid="profile.tabs">
        <TabsList className="bg-muted mb-4 w-full sm:w-auto">
          <TabsTrigger value="current" data-ocid="profile.tab_current">
            <BookOpen className="h-3.5 w-3.5 mr-1.5" />
            Currently Reading
            {inProgress.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-1.5 h-4 px-1.5 text-[10px] bg-primary/20 text-primary"
              >
                {inProgress.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" data-ocid="profile.tab_completed">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
            Completed
            {completed.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-1.5 h-4 px-1.5 text-[10px] bg-accent/20 text-accent"
              >
                {completed.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all" data-ocid="profile.tab_all">
            All History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          {histLoading ? (
            <HistorySkeleton />
          ) : inProgress.length === 0 ? (
            <EmptyHistory
              icon={BookOpen}
              message="No novels in progress"
              sub="Browse the library to find your next adventure."
              ocid="profile.current_empty_state"
            />
          ) : (
            <div className="space-y-3">
              {inProgress.map((item, i) => (
                <ReadingHistoryItem
                  key={item.novelId}
                  item={item}
                  index={i + 1}
                  author={NOVEL_META[item.novelId]?.author}
                  genre={NOVEL_META[item.novelId]?.genre}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {histLoading ? (
            <HistorySkeleton />
          ) : completed.length === 0 ? (
            <EmptyHistory
              icon={CheckCircle2}
              message="No completed novels yet"
              sub="Finish a novel to see it here."
              ocid="profile.completed_empty_state"
            />
          ) : (
            <div className="space-y-3">
              {completed.map((item, i) => (
                <ReadingHistoryItem
                  key={item.novelId}
                  item={item}
                  index={i + 1}
                  author={NOVEL_META[item.novelId]?.author}
                  genre={NOVEL_META[item.novelId]?.genre}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          {histLoading ? (
            <HistorySkeleton />
          ) : (history ?? []).length === 0 ? (
            <EmptyHistory
              icon={Library}
              message="No reading history yet"
              sub="Start reading to track your progress here."
              ocid="profile.all_empty_state"
              cta
            />
          ) : (
            <div className="space-y-3">
              {(history ?? []).map((item, i) => (
                <ReadingHistoryItem
                  key={item.novelId}
                  item={item}
                  index={i + 1}
                  author={NOVEL_META[item.novelId]?.author}
                  genre={NOVEL_META[item.novelId]?.genre}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
