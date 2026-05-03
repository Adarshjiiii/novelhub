export interface Novel {
  id: string;
  title: string;
  author: string;
  authorId: string;
  coverImage: string;
  description: string;
  genre: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  chapterCount: number;
  wordCount: number;
  status: "ongoing" | "completed" | "hiatus";
  isHot: boolean;
  isTrending: boolean;
  isNew: boolean;
  createdAt: number;
  updatedAt: number;
  views: number;
  likes: number;
  coAuthors: string[];
}

export interface Chapter {
  id: string;
  novelId: string;
  title: string;
  chapterNumber: number;
  content: string;
  wordCount: number;
  publishedAt: number;
  updatedAt: number;
  isLocked: boolean;
  views: number;
  comments: number;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  joinedAt: number;
  readingCount: number;
  writingCount: number;
  friendCount: number;
  isOnline: boolean;
  lastActive: number;
  isAuthor: boolean;
}

export interface ReadingProgress {
  novelId: string;
  novelTitle: string;
  novelCover: string;
  chapterId: string;
  chapterNumber: number;
  totalChapters: number;
  progressPercent: number;
  lastReadAt: number;
}

export interface FriendRequest {
  id: string;
  fromUserId: string;
  fromUsername: string;
  fromAvatar: string;
  toUserId: string;
  status: "pending" | "accepted" | "declined";
  sentAt: number;
}

export interface Friend {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  isOnline: boolean;
  lastActive: number;
  currentlyReading?: string;
  currentActivity?: string;
}

export interface CollabSession {
  id: string;
  novelId: string;
  chapterId: string;
  participants: string[];
  content: string;
  lastEditedBy: string;
  lastEditedAt: number;
  isActive: boolean;
}

export interface CollabSessionPublic {
  chapterId: bigint;
  novelId: bigint;
  activeEditors: string[];
  lastContent: string;
  lastUpdated: bigint;
}

export interface AuthorStats {
  totalNovels: number;
  totalReads: number;
  avgRating: number;
}

export interface RankedNovel extends Novel {
  rank: number;
  badge: string;
  badgeColor: string;
}

export interface Notification {
  id: string;
  type: "friend_request" | "chapter_update" | "comment" | "like" | "system";
  message: string;
  isRead: boolean;
  createdAt: number;
  link?: string;
}
