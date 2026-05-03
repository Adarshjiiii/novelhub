import type {
  Friend,
  Novel,
  RankedNovel,
  ReadingProgress,
  UserProfile,
} from "@/types";

export const MOCK_NOVELS: Novel[] = [
  {
    id: "1",
    title: "The Lunar Chronicles",
    author: "Marissa Meyer",
    authorId: "a1",
    coverImage: "/assets/generated/cover-lunar-chronicles.dim_400x600.jpg",
    description:
      "A series of young adult science fiction novels loosely based on fairy tales set in a futuristic world where humans and cyborgs coexist.",
    genre: ["Sci-Fi", "Romance", "Fantasy"],
    tags: ["cyborg", "fairy-tale-retelling", "dystopian"],
    rating: 4.8,
    reviewCount: 12430,
    chapterCount: 47,
    wordCount: 380000,
    status: "completed",
    isHot: true,
    isTrending: true,
    isNew: false,
    createdAt: Date.now() - 86400000 * 365,
    updatedAt: Date.now() - 86400000 * 30,
    views: 2340000,
    likes: 189000,
    coAuthors: [],
  },
  {
    id: "2",
    title: "Realm of Shadows",
    author: "Elara Vance",
    authorId: "a2",
    coverImage: "/assets/generated/cover-realm-shadows.dim_400x600.jpg",
    description:
      "A dark fantasy epic where an ancient darkness threatens to consume the realm and only one chosen warrior can stop it.",
    genre: ["Fantasy", "Adventure", "Dark Fantasy"],
    tags: ["magic", "chosen-one", "epic"],
    rating: 4.7,
    reviewCount: 8912,
    chapterCount: 63,
    wordCount: 520000,
    status: "ongoing",
    isHot: false,
    isTrending: true,
    isNew: true,
    createdAt: Date.now() - 86400000 * 60,
    updatedAt: Date.now() - 86400000 * 2,
    views: 1890000,
    likes: 145000,
    coAuthors: [],
  },
  {
    id: "3",
    title: "Neon Echoes",
    author: "Kai Thorne",
    authorId: "a3",
    coverImage: "/assets/generated/cover-neon-echoes.dim_400x600.jpg",
    description:
      "A neon-drenched cyberpunk thriller where a hacker uncovers a corporate conspiracy that threatens the entire city.",
    genre: ["Cyberpunk", "Thriller", "Sci-Fi"],
    tags: ["hacker", "dystopian", "neon"],
    rating: 4.9,
    reviewCount: 15200,
    chapterCount: 38,
    wordCount: 290000,
    status: "completed",
    isHot: true,
    isTrending: true,
    isNew: false,
    createdAt: Date.now() - 86400000 * 180,
    updatedAt: Date.now() - 86400000 * 14,
    views: 3120000,
    likes: 256000,
    coAuthors: [],
  },
  {
    id: "4",
    title: "Wildwood Dreams",
    author: "Aria Finch",
    authorId: "a4",
    coverImage: "/assets/generated/cover-wildwood-dreams.dim_400x600.jpg",
    description:
      "A breathtaking YA fantasy where a girl discovers she can speak to the ancient forest spirits and must save her village.",
    genre: ["Fantasy", "YA", "Nature"],
    tags: ["spirits", "forest", "coming-of-age"],
    rating: 4.6,
    reviewCount: 7340,
    chapterCount: 52,
    wordCount: 430000,
    status: "ongoing",
    isHot: false,
    isTrending: true,
    isNew: false,
    createdAt: Date.now() - 86400000 * 240,
    updatedAt: Date.now() - 86400000 * 5,
    views: 1230000,
    likes: 98000,
    coAuthors: [],
  },
  {
    id: "5",
    title: "Echoes of Eternity",
    author: "Marcus Cole",
    authorId: "a5",
    coverImage: "/assets/generated/cover-echoes-eternity.dim_400x600.jpg",
    description:
      "An immortal warrior searches across centuries for his lost beloved, facing gods, demons, and the weight of eternity.",
    genre: ["Fantasy", "Romance", "Historical"],
    tags: ["immortal", "time-travel", "epic-romance"],
    rating: 4.7,
    reviewCount: 10870,
    chapterCount: 71,
    wordCount: 610000,
    status: "ongoing",
    isHot: true,
    isTrending: true,
    isNew: false,
    createdAt: Date.now() - 86400000 * 300,
    updatedAt: Date.now() - 86400000 * 1,
    views: 2560000,
    likes: 201000,
    coAuthors: [],
  },
  {
    id: "6",
    title: "Six of Crows",
    author: "Leigh Bardugo",
    authorId: "a6",
    coverImage: "/assets/generated/cover-six-crows.dim_400x600.jpg",
    description:
      "A criminal mastermind leads a crew of dangerous outcasts on an impossible heist through a treacherous fantasy world.",
    genre: ["Fantasy", "Heist", "Adventure"],
    tags: ["heist", "anti-hero", "magic-system"],
    rating: 4.7,
    reviewCount: 18920,
    chapterCount: 45,
    wordCount: 360000,
    status: "completed",
    isHot: true,
    isTrending: false,
    isNew: false,
    createdAt: Date.now() - 86400000 * 500,
    updatedAt: Date.now() - 86400000 * 120,
    views: 4100000,
    likes: 340000,
    coAuthors: [],
  },
  {
    id: "7",
    title: "Lore Olympus",
    author: "Rachel Smythe",
    authorId: "a7",
    coverImage: "/assets/generated/cover-lore-olympus.dim_400x600.jpg",
    description:
      "A modern retelling of the myth of Hades and Persephone set in a vibrant, stylized version of the Greek underworld.",
    genre: ["Romance", "Mythology", "Fantasy"],
    tags: ["greek-mythology", "slow-burn", "modern"],
    rating: 4.7,
    reviewCount: 21400,
    chapterCount: 89,
    wordCount: 280000,
    status: "ongoing",
    isHot: true,
    isTrending: true,
    isNew: false,
    createdAt: Date.now() - 86400000 * 600,
    updatedAt: Date.now() - 86400000 * 3,
    views: 5200000,
    likes: 432000,
    coAuthors: [],
  },
  {
    id: "8",
    title: "Legendborn",
    author: "Tracy Deonn",
    authorId: "a8",
    coverImage: "/assets/generated/cover-legendborn.dim_400x600.jpg",
    description:
      "A Black girl at a prestigious university discovers a secret society of Arthurian legend descendants and her own magical heritage.",
    genre: ["Fantasy", "YA", "Mystery"],
    tags: ["arthurian", "college", "magic"],
    rating: 4.6,
    reviewCount: 9870,
    chapterCount: 34,
    wordCount: 270000,
    status: "completed",
    isHot: false,
    isTrending: true,
    isNew: false,
    createdAt: Date.now() - 86400000 * 400,
    updatedAt: Date.now() - 86400000 * 60,
    views: 1890000,
    likes: 156000,
    coAuthors: [],
  },
  {
    id: "9",
    title: "The Ember Crown",
    author: "Selene Dusk",
    authorId: "a9",
    coverImage: "https://picsum.photos/seed/embercrown/400/600",
    description:
      "In a dying kingdom ruled by shadow, a disgraced knight must forge an alliance with the realm's most feared sorcerer to reclaim a stolen crown before the last ember fades.",
    genre: ["Fantasy", "Adventure", "Dark Fantasy"],
    tags: ["knight", "sorcery", "redemption"],
    rating: 4.5,
    reviewCount: 6420,
    chapterCount: 41,
    wordCount: 330000,
    status: "ongoing",
    isHot: false,
    isTrending: true,
    isNew: true,
    createdAt: Date.now() - 86400000 * 45,
    updatedAt: Date.now() - 86400000 * 3,
    views: 980000,
    likes: 76000,
    coAuthors: [],
  },
  {
    id: "10",
    title: "Starfall Protocol",
    author: "Noa Voss",
    authorId: "a10",
    coverImage: "https://picsum.photos/seed/starfallprotocol/400/600",
    description:
      "When a distress beacon from an abandoned space station awakens an AI that shouldn't exist, a crew of deep-space salvagers uncovers a conspiracy that spans galaxies.",
    genre: ["Sci-Fi", "Thriller", "Adventure"],
    tags: ["space", "AI", "conspiracy"],
    rating: 4.8,
    reviewCount: 11230,
    chapterCount: 29,
    wordCount: 240000,
    status: "completed",
    isHot: true,
    isTrending: false,
    isNew: false,
    createdAt: Date.now() - 86400000 * 220,
    updatedAt: Date.now() - 86400000 * 45,
    views: 2140000,
    likes: 178000,
    coAuthors: [],
  },
];

export const MOCK_TOP_NOVELS: RankedNovel[] = MOCK_NOVELS.slice(0, 5).map(
  (n, i) => ({
    ...n,
    rank: i + 1,
    badge: i === 0 ? "#1 TRENDING" : i === 1 ? "NEW RELEASE" : "MUST READ",
    badgeColor:
      i === 0
        ? "bg-secondary text-secondary-foreground"
        : i === 1
          ? "bg-accent text-accent-foreground"
          : "bg-primary/80 text-primary-foreground",
  }),
);

export const MOCK_FRIENDS: Friend[] = [
  {
    id: "f1",
    userId: "u2",
    username: "alexreads",
    displayName: "Alex R.",
    avatar: "AR",
    isOnline: true,
    lastActive: Date.now(),
    currentlyReading: "Fourth Wing",
    currentActivity: "Reading Fourth Wing",
  },
  {
    id: "f2",
    userId: "u3",
    username: "chloe_b",
    displayName: "Chloe B.",
    avatar: "CB",
    isOnline: true,
    lastActive: Date.now() - 60000 * 5,
    currentlyReading: "Iron Flame",
    currentActivity: "Completed Iron Flame",
  },
  {
    id: "f3",
    userId: "u4",
    username: "ben_lit",
    displayName: "Ben L.",
    avatar: "BL",
    isOnline: false,
    lastActive: Date.now() - 3600000 * 2,
    currentlyReading: "Divine Rivals",
    currentActivity: "Added Divine Rivals to Library",
  },
  {
    id: "f4",
    userId: "u5",
    username: "maya_reads",
    displayName: "Maya T.",
    avatar: "MT",
    isOnline: true,
    lastActive: Date.now() - 60000 * 15,
    currentlyReading: "A Court of Thorns",
    currentActivity: "Reading A Court of Thorns and Roses",
  },
];

export const MOCK_READING_HISTORY: ReadingProgress[] = [
  {
    novelId: "1",
    novelTitle: "A Court of Thorns and Roses",
    novelCover: "/assets/generated/cover-lunar-chronicles.dim_400x600.jpg",
    chapterId: "c35",
    chapterNumber: 35,
    totalChapters: 46,
    progressPercent: 75,
    lastReadAt: Date.now() - 3600000 * 3,
  },
  {
    novelId: "2",
    novelTitle: "Chain of Gold",
    novelCover: "/assets/generated/cover-realm-shadows.dim_400x600.jpg",
    chapterId: "c20",
    chapterNumber: 20,
    totalChapters: 44,
    progressPercent: 45,
    lastReadAt: Date.now() - 3600000 * 24,
  },
  {
    novelId: "3",
    novelTitle: "Shatter Me",
    novelCover: "/assets/generated/cover-neon-echoes.dim_400x600.jpg",
    chapterId: "c10",
    chapterNumber: 10,
    totalChapters: 66,
    progressPercent: 15,
    lastReadAt: Date.now() - 3600000 * 48,
  },
];

export type { Chapter } from "@/types";

export const MOCK_CHAPTER_TITLES: Record<number, string> = {
  1: "The Beginning of Everything",
  2: "Dark Awakening",
  3: "Into the Unknown",
  4: "Shadows Fall",
  5: "A New Alliance",
  6: "The Truth Revealed",
  7: "Breaking Point",
  8: "Rising Storm",
  9: "Convergence",
  10: "Aftermath",
  11: "The Long Road",
  12: "Fractured Light",
  13: "Crossing Borders",
  14: "Whispers in the Dark",
  15: "The Weight of Secrets",
};

const CHAPTER_CONTENT = `The night sky above New Beijing shimmered with thousands of stars, but Cinder barely noticed them. Her chrome fingers worked deftly beneath the hood of an old hover, oil-stained and cool to the touch.

She had been at this particular engine for three hours now, long enough that the bazaar vendors around her had packed up their stalls and retreated into the warm glow of the market. The smell of sesame noodles lingered in the cool air, teasing her with memories of dinners she rarely got to eat while daylight remained.

"You're going to be there all night, aren't you?"

Cinder looked up. Iko hovered at the entrance of the workshop, her round sensor glowing a pale amber — her version of worry. The android had served the Linh family since before Cinder arrived, and in that time had developed what Cinder privately called a personality. Adri would have called it a malfunction.

"Just one more hour," Cinder said, returning to the engine. "The magistrate needs this back by morning."

"The magistrate," Iko said, "also has twelve other mechanics in this district who don't work past sunset."

Cinder smiled, but didn't answer. The money was good, and good money was scarce. Every credit went into a private account Adri didn't know about. Someday it would be enough.

Someday.

She heard footsteps behind her — too deliberate, too measured for a curious passerby — and felt the hair on her neck stand up. When she turned, the prince was standing in the entrance to her workshop.

Not a prince, she reminded herself. Just a customer.

But his posture said otherwise.

He was taller than she'd expected, dressed plainly enough that she wouldn't have known him except for the insignia worn small on his collar — the crest of New Beijing, the kind of thing worn without thinking by those born to it. His eyes scanned the workshop with the calm assessment of someone cataloguing escape routes.

"Linh Cinder?" he asked.

"Who's asking?" she said, before her brain caught up with her mouth.

A corner of his mouth lifted. It wasn't quite a smile. "Kai."

Just Kai. As if that was supposed to mean anything to a girl who spent her days under hovers and her nights calculating how many more repairs stood between her and freedom.

"I need a mechanic," he said. "I was told you're the best in the lower ward."

"Most days," she said, because she was.

He reached into his jacket and produced a small device — a personal android companion, she saw, the kind of high-end model that cost more than she'd earn in a year — and held it out to her. "She's stopped responding. I need her back."

Cinder took the android, turned her over in her chrome hands, and ran the preliminary scan without thinking about it. The readings were interesting. More than interesting.

"This will take a few days," she said. "Maybe a week."

"I have a week," he said.

She looked up then, and found him watching her with an expression she couldn't quite parse. Curious, she thought. But about what, she wasn't sure.`;

export function generateChaptersForNovel(
  novelId: string,
  count: number,
): import("@/types").Chapter[] {
  return Array.from({ length: Math.min(count, 15) }, (_, i) => ({
    id: `${novelId}-c${i + 1}`,
    novelId,
    title: MOCK_CHAPTER_TITLES[i + 1] ?? `Chapter ${i + 1}`,
    chapterNumber: i + 1,
    content: CHAPTER_CONTENT,
    wordCount: 2400 + Math.floor(Math.random() * 800),
    publishedAt: Date.now() - 86400000 * (count - i),
    updatedAt: Date.now() - 86400000 * (count - i),
    isLocked: i > 9,
    views: Math.max(5000, 185000 - i * 12000),
    comments: Math.max(20, 342 - i * 30),
  }));
}

export const MOCK_USERS: UserProfile[] = [
  {
    id: "u1",
    username: "sarah_j",
    displayName: "Sarah J.",
    avatar: "SJ",
    bio: "Fantasy and sci-fi enthusiast. Always reading.",
    joinedAt: Date.now() - 86400000 * 365,
    readingCount: 142,
    writingCount: 3,
    friendCount: 28,
    isOnline: true,
    lastActive: Date.now(),
    isAuthor: false,
  },
];
