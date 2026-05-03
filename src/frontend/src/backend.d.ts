import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SaveProgressRequest {
    lastChapterNumber: bigint;
    lastChapterId: ChapterId;
    novelId: NovelId;
    percentComplete: number;
}
export type Timestamp = bigint;
export interface RatingRequest {
    novelId: NovelId;
    rating: bigint;
}
export interface CollabSessionPublic {
    lastUpdated: Timestamp;
    chapterId: ChapterId;
    novelId: NovelId;
    lastContent: string;
    activeEditors: Array<UserId>;
}
export interface ReadingProgressPublic {
    userId: UserId;
    lastChapterNumber: bigint;
    lastChapterId: ChapterId;
    novelId: NovelId;
    updatedAt: Timestamp;
    percentComplete: number;
}
export interface Chapter {
    id: ChapterId;
    title: string;
    content: string;
    chapterNumber: bigint;
    createdAt: Timestamp;
    novelId: NovelId;
}
export type ChapterId = bigint;
export interface UserProfilePublic {
    id: UserId;
    bio: string;
    username: string;
    chaptersRead: bigint;
    createdAt: Timestamp;
    novelsRead: bigint;
    avatarUrl: string;
    isAuthor: boolean;
}
export type UserId = Principal;
export type NovelId = bigint;
export interface NovelPublic {
    id: NovelId;
    title: string;
    ratingCount: bigint;
    createdAt: Timestamp;
    tags: Array<string>;
    authorName: string;
    description: string;
    coverImage: string;
    genre: string;
    coAuthors: Array<UserId>;
    totalReads: bigint;
    authorPrincipal: UserId;
    avgRating: number;
}
export interface CreateNovelRequest {
    title: string;
    tags: Array<string>;
    description: string;
    coverImage: string;
    genre: string;
}
export type SaveDraftResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export interface CreateChapterRequest {
    title: string;
    content: string;
    chapterNumber: bigint;
    novelId: NovelId;
}
export interface backendInterface {
    acceptFriendRequest(from: UserId): Promise<boolean>;
    addChapter(req: CreateChapterRequest): Promise<bigint>;
    addCoAuthor(novelId: NovelId, coAuthor: Principal): Promise<boolean>;
    becomeAuthor(): Promise<boolean>;
    createNovel(req: CreateNovelRequest, authorName: string): Promise<bigint>;
    createProfile(username: string, bio: string, avatarUrl: string): Promise<boolean>;
    declineFriendRequest(from: UserId): Promise<boolean>;
    filterByGenre(genre: string): Promise<Array<NovelPublic>>;
    getActiveSessions(novelId: NovelId): Promise<Array<CollabSessionPublic>>;
    getAllNovels(): Promise<Array<NovelPublic>>;
    getChapter(chapterId: ChapterId): Promise<Chapter | null>;
    getChapterDraft(chapterId: ChapterId): Promise<CollabSessionPublic | null>;
    getFriends(): Promise<Array<UserId>>;
    getMyProfile(): Promise<UserProfilePublic | null>;
    getNovel(novelId: NovelId): Promise<NovelPublic | null>;
    getNovelChapters(novelId: NovelId): Promise<Array<Chapter>>;
    getPendingRequests(): Promise<Array<UserId>>;
    getProfile(userId: UserId): Promise<UserProfilePublic | null>;
    getProgress(novelId: NovelId): Promise<ReadingProgressPublic | null>;
    getReadingHistory(): Promise<Array<ReadingProgressPublic>>;
    getTopNovels(): Promise<Array<NovelPublic>>;
    incrementReadCount(chapterId: ChapterId): Promise<void>;
    joinCollabSession(chapterId: ChapterId, novelId: NovelId): Promise<void>;
    leaveCollabSession(chapterId: ChapterId): Promise<void>;
    publishChapter(chapterId: ChapterId): Promise<SaveDraftResult>;
    rateNovel(req: RatingRequest): Promise<boolean>;
    removeCoAuthor(novelId: NovelId, coAuthor: Principal): Promise<boolean>;
    removeFriend(friendId: UserId): Promise<boolean>;
    saveChapterDraft(chapterId: ChapterId, content: string): Promise<SaveDraftResult>;
    saveProgress(req: SaveProgressRequest): Promise<boolean>;
    searchNovels(term: string): Promise<Array<NovelPublic>>;
    searchUsers(term: string): Promise<Array<UserProfilePublic>>;
    sendFriendRequest(to: UserId): Promise<boolean>;
    updateChapter(chapterId: ChapterId, title: string, content: string): Promise<boolean>;
    updateNovel(novelId: NovelId, req: CreateNovelRequest): Promise<boolean>;
    updateProfile(username: string, bio: string, avatarUrl: string): Promise<boolean>;
}
