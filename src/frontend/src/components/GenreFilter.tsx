const GENRES = [
  { label: "All", value: "All" },
  { label: "Fantasy", value: "Fantasy" },
  { label: "Romance", value: "Romance" },
  { label: "Sci-Fi", value: "Sci-Fi" },
  { label: "Mystery", value: "Mystery" },
  { label: "Thriller", value: "Thriller" },
  { label: "Cyberpunk", value: "Cyberpunk" },
  { label: "Horror", value: "Horror" },
  { label: "Historical", value: "Historical" },
  { label: "Drama", value: "Drama" },
  { label: "YA", value: "YA" },
  { label: "Mythology", value: "Mythology" },
  { label: "Adventure", value: "Adventure" },
];

interface GenreFilterProps {
  active: string;
  onSelect: (genre: string) => void;
}

export function GenreFilter({ active, onSelect }: GenreFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto scrollbar-none pb-1"
      role="tablist"
      aria-label="Genre filter"
    >
      {GENRES.map((g) => (
        <button
          type="button"
          key={g.value}
          role="tab"
          aria-selected={active === g.value}
          onClick={() => onSelect(g.value)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            active === g.value
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
              : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
          data-ocid={`library.genre.${g.value.toLowerCase().replace("-", "_")}`}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
}

export { GENRES };
