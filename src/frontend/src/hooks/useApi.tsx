import { createActor } from "@/backend";
import type {
  Chapter as BackendChapter,
  NovelPublic,
  UserProfilePublic,
} from "@/backend.d";
import {
  MOCK_FRIENDS,
  MOCK_NOVELS,
  MOCK_READING_HISTORY,
  MOCK_TOP_NOVELS,
  MOCK_USERS,
  generateChaptersForNovel,
} from "@/lib/mockData";
import type {
  Chapter,
  Friend,
  Novel,
  RankedNovel,
  ReadingProgress,
  UserProfile,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

// ── Backend helpers ──────────────────────────────────────────────────────────

function mapNovel(n: NovelPublic): Novel {
  return {
    id: n.id.toString(),
    title: n.title,
    author: n.authorName,
    authorId: n.authorPrincipal.toString(),
    coverImage: n.coverImage,
    description: n.description,
    genre: [n.genre],
    tags: n.tags,
    rating: n.avgRating,
    reviewCount: Number(n.ratingCount),
    chapterCount: 0,
    wordCount: 0,
    status: "ongoing",
    isHot: Number(n.totalReads) > 1000,
    isTrending: n.avgRating > 4,
    isNew:
      Date.now() - Number(n.createdAt) / 1_000_000 < 7 * 24 * 60 * 60 * 1000,
    createdAt: Number(n.createdAt) / 1_000_000,
    updatedAt: Number(n.createdAt) / 1_000_000,
    views: Number(n.totalReads),
    likes: 0,
    coAuthors: n.coAuthors.map((p) => p.toString()),
  };
}

function mapChapter(c: BackendChapter): Chapter {
  return {
    id: c.id.toString(),
    novelId: c.novelId.toString(),
    title: c.title,
    chapterNumber: Number(c.chapterNumber),
    content: c.content,
    wordCount: c.content.split(/\s+/).length,
    publishedAt: Number(c.createdAt) / 1_000_000,
    updatedAt: Number(c.createdAt) / 1_000_000,
    isLocked: false,
    views: 0,
    comments: 0,
  };
}

function mapProfile(p: UserProfilePublic): UserProfile {
  return {
    id: p.id.toString(),
    username: p.username,
    displayName: p.username,
    avatar: p.avatarUrl,
    bio: p.bio,
    joinedAt: Number(p.createdAt) / 1_000_000,
    readingCount: Number(p.novelsRead),
    writingCount: 0,
    friendCount: 0,
    isOnline: true,
    lastActive: Date.now(),
    isAuthor: p.isAuthor,
  };
}

// ── Novels ───────────────────────────────────────────────────────────────────

export function useNovels(genre?: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Novel[]>({
    queryKey: ["novels", genre],
    queryFn: async () => {
      if (actor) {
        const novels = genre
          ? await actor.filterByGenre(genre)
          : await actor.getAllNovels();
        return novels.map(mapNovel);
      }
      if (genre) return MOCK_NOVELS.filter((n) => n.genre.includes(genre));
      return MOCK_NOVELS;
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useNovel(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Novel | null>({
    queryKey: ["novel", id],
    queryFn: async () => {
      if (actor) {
        const novel = await actor.getNovel(BigInt(id));
        return novel ? mapNovel(novel) : null;
      }
      return MOCK_NOVELS.find((n) => n.id === id) ?? null;
    },
    enabled: !!id && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTopNovels() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RankedNovel[]>({
    queryKey: ["top-novels"],
    queryFn: async () => {
      if (actor) {
        const novels = await actor.getTopNovels();
        return novels.map((n, i) => ({
          ...mapNovel(n),
          rank: i + 1,
          badge: i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`,
          badgeColor:
            i === 0
              ? "gold"
              : i === 1
                ? "silver"
                : i === 2
                  ? "bronze"
                  : "default",
        }));
      }
      return MOCK_TOP_NOVELS;
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useChapters(novelId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Chapter[]>({
    queryKey: ["chapters", novelId],
    queryFn: async () => {
      if (actor) {
        const chapters = await actor.getNovelChapters(BigInt(novelId));
        return chapters.map(mapChapter);
      }
      const novel = MOCK_NOVELS.find((n) => n.id === novelId);
      if (!novel) return [];
      return generateChaptersForNovel(novelId, novel.chapterCount);
    },
    enabled: !!novelId && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useChapter(novelId: string, chapterId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Chapter | null>({
    queryKey: ["chapter", novelId, chapterId],
    queryFn: async () => {
      if (actor && chapterId) {
        const chapter = await actor.getChapter(BigInt(chapterId));
        return chapter ? mapChapter(chapter) : null;
      }
      const novel = MOCK_NOVELS.find((n) => n.id === novelId);
      if (!novel) return null;
      const chapters = generateChaptersForNovel(novelId, novel.chapterCount);
      return chapters.find((c) => c.id === chapterId) ?? null;
    },
    enabled: !!novelId && !!chapterId && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

// ── User ─────────────────────────────────────────────────────────────────────

export function useUserProfile(userId?: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (actor && userId) {
        const profile = await actor.getProfile(
          (await import("@icp-sdk/core/principal")).Principal.fromText(userId),
        );
        return profile ? mapProfile(profile) : null;
      }
      if (!userId) return null;
      return MOCK_USERS.find((u) => u.id === userId) ?? null;
    },
    enabled: !!userId && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMyProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["my-profile"],
    queryFn: async () => {
      if (!actor) return null;
      const profile = await actor.getMyProfile();
      return profile ? mapProfile(profile) : null;
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

// ── Social ────────────────────────────────────────────────────────────────────

export function useFriends(userId?: string) {
  return useQuery<Friend[]>({
    queryKey: ["friends", userId],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return userId ? MOCK_FRIENDS : [];
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useReadingHistory(userId?: string) {
  return useQuery<ReadingProgress[]>({
    queryKey: ["reading-history", userId],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return userId ? MOCK_READING_HISTORY : [];
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });
}
