import List "mo:core/List";
import NovelTypes "../types/novel";
import NovelLib "../lib/novel";

mixin (
  novels : List.List<NovelLib.Novel>,
  chapters : List.List<NovelLib.Chapter>,
  nextNovelId : { var value : Nat },
  nextChapterId : { var value : Nat },
) {

  public shared ({ caller }) func createNovel(req : NovelTypes.CreateNovelRequest, authorName : Text) : async Nat {
    let id = nextNovelId.value;
    nextNovelId.value += 1;
    novels.add(NovelLib.new(id, caller, authorName, req));
    id;
  };

  public shared ({ caller }) func updateNovel(
    novelId : NovelTypes.NovelId,
    req : NovelTypes.CreateNovelRequest,
  ) : async Bool {
    switch (NovelLib.findById(novels, novelId)) {
      case (?novel) {
        if (not (novel.authorPrincipal == caller)) { return false };
        let curTotalReads = novel.totalReads;
        let curRatingSum = novel.ratingSum;
        let curRatingCount = novel.ratingCount;
        novels.mapInPlace(func(n) {
          if (n.id == novelId) {
            {
              n with
              title = req.title;
              description = req.description;
              coverImage = req.coverImage;
              genre = req.genre;
              tags = req.tags;
              var coAuthors = n.coAuthors;
              var totalReads = curTotalReads;
              var ratingSum = curRatingSum;
              var ratingCount = curRatingCount;
            }
          } else { n }
        });
        true;
      };
      case null { false };
    };
  };

  public shared ({ caller }) func addChapter(req : NovelTypes.CreateChapterRequest) : async Nat {
    switch (NovelLib.findById(novels, req.novelId)) {
      case (?novel) {
        if (not (novel.authorPrincipal == caller)) {
          return 0;
        };
      };
      case null { return 0 };
    };
    let id = nextChapterId.value;
    nextChapterId.value += 1;
    chapters.add(NovelLib.newChapter(id, req));
    id;
  };

  public shared ({ caller }) func updateChapter(
    chapterId : NovelTypes.ChapterId,
    title : Text,
    content : Text,
  ) : async Bool {
    let chapter = chapters.find(func(c) { c.id == chapterId });
    switch (chapter) {
      case (?ch) {
        switch (NovelLib.findById(novels, ch.novelId)) {
          case (?novel) {
            if (not (novel.authorPrincipal == caller)) { return false };
          };
          case null { return false };
        };
        chapters.mapInPlace(func(c) {
          if (c.id == chapterId) { { c with title; content } } else { c }
        });
        true;
      };
      case null { false };
    };
  };

  /// Add a co-author to a novel (caller must be the primary author).
  public shared ({ caller }) func addCoAuthor(
    novelId : NovelTypes.NovelId,
    coAuthor : Principal,
  ) : async Bool {
    switch (NovelLib.findById(novels, novelId)) {
      case (?novel) {
        if (not (novel.authorPrincipal == caller)) { return false };
        let already = novel.coAuthors.any(func(p : Principal) : Bool { p == coAuthor });
        switch (already) {
          case (true) { true };
          case false {
            novel.coAuthors := novel.coAuthors.concat([coAuthor]);
            true;
          };
        };
      };
      case null { false };
    };
  };

  /// Remove a co-author from a novel (caller must be the primary author).
  public shared ({ caller }) func removeCoAuthor(
    novelId : NovelTypes.NovelId,
    coAuthor : Principal,
  ) : async Bool {
    switch (NovelLib.findById(novels, novelId)) {
      case (?novel) {
        if (not (novel.authorPrincipal == caller)) { return false };
        novel.coAuthors := novel.coAuthors.filter(func(p : Principal) : Bool { p != coAuthor });
        true;
      };
      case null { false };
    };
  };

  public query func getAllNovels() : async [NovelTypes.NovelPublic] {
    novels.map<NovelLib.Novel, NovelTypes.NovelPublic>(func(n) { NovelLib.toPublic(n) }).toArray();
  };

  public query func getNovel(novelId : NovelTypes.NovelId) : async ?NovelTypes.NovelPublic {
    switch (NovelLib.findById(novels, novelId)) {
      case (?n) { ?NovelLib.toPublic(n) };
      case null { null };
    };
  };

  public query func getNovelChapters(novelId : NovelTypes.NovelId) : async [NovelTypes.Chapter] {
    chapters.filter(func(c) { c.novelId == novelId }).toArray();
  };

  public query func getChapter(chapterId : NovelTypes.ChapterId) : async ?NovelTypes.Chapter {
    chapters.find(func(c) { c.id == chapterId });
  };

  public query func searchNovels(term : Text) : async [NovelTypes.NovelPublic] {
    NovelLib.search(novels, term);
  };

  public query func filterByGenre(genre : Text) : async [NovelTypes.NovelPublic] {
    NovelLib.filterByGenre(novels, genre);
  };

  public shared func incrementReadCount(chapterId : NovelTypes.ChapterId) : async () {
    let chapter = chapters.find(func(c) { c.id == chapterId });
    switch (chapter) {
      case (?ch) {
        switch (NovelLib.findById(novels, ch.novelId)) {
          case (?novel) { novel.totalReads += 1 };
          case null {};
        };
      };
      case null {};
    };
  };

  public shared ({ caller }) func rateNovel(req : NovelTypes.RatingRequest) : async Bool {
    if (req.rating < 1 or req.rating > 5) { return false };
    switch (NovelLib.findById(novels, req.novelId)) {
      case (?novel) {
        NovelLib.rateNovel(novel, req.rating);
        true;
      };
      case null { false };
    };
  };

  public query func getTopNovels() : async [NovelTypes.NovelPublic] {
    NovelLib.getTopByReads(novels, 5);
  };
};
