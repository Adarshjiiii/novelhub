import List "mo:core/List";
import NovelTypes "../types/novel";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

module {
  public type Novel = NovelTypes.Novel;
  public type NovelPublic = NovelTypes.NovelPublic;
  public type Chapter = NovelTypes.Chapter;
  public type CreateNovelRequest = NovelTypes.CreateNovelRequest;
  public type CreateChapterRequest = NovelTypes.CreateChapterRequest;

  public func toPublic(n : Novel) : NovelPublic {
    let avg : Float = if (n.ratingCount == 0) { 0.0 } else {
      n.ratingSum.toFloat() / n.ratingCount.toFloat()
    };
    {
      id = n.id;
      title = n.title;
      authorPrincipal = n.authorPrincipal;
      authorName = n.authorName;
      description = n.description;
      coverImage = n.coverImage;
      genre = n.genre;
      tags = n.tags;
      coAuthors = n.coAuthors;
      totalReads = n.totalReads;
      avgRating = avg;
      ratingCount = n.ratingCount;
      createdAt = n.createdAt;
    };
  };

  public func new(id : Nat, author : Principal, authorName : Text, req : CreateNovelRequest) : Novel {
    {
      id;
      title = req.title;
      authorPrincipal = author;
      authorName;
      description = req.description;
      coverImage = req.coverImage;
      genre = req.genre;
      tags = req.tags;
      var coAuthors = [];
      var totalReads = 0;
      var ratingSum = 0;
      var ratingCount = 0;
      createdAt = Time.now();
    };
  };

  public func newChapter(id : Nat, req : CreateChapterRequest) : Chapter {
    {
      id;
      novelId = req.novelId;
      title = req.title;
      content = req.content;
      chapterNumber = req.chapterNumber;
      createdAt = Time.now();
    };
  };

  public func findById(novels : List.List<Novel>, id : Nat) : ?Novel {
    novels.find(func(n) { n.id == id });
  };

  public func search(novels : List.List<Novel>, term : Text) : [NovelPublic] {
    let lower = term.toLower();
    novels.filter(func(n) {
      n.title.toLower().contains(#text lower) or n.authorName.toLower().contains(#text lower)
    })
    .map<Novel, NovelPublic>(func(n) { toPublic(n) })
    .toArray();
  };

  public func filterByGenre(novels : List.List<Novel>, genre : Text) : [NovelPublic] {
    let lower = genre.toLower();
    novels.filter(func(n) { n.genre.toLower() == lower })
      .map<Novel, NovelPublic>(func(n) { toPublic(n) })
      .toArray();
  };

  public func getTopByReads(novels : List.List<Novel>, count : Nat) : [NovelPublic] {
    let arr = novels.toArray();
    let sorted = arr.sort(func(a, b) {
      if (a.totalReads > b.totalReads) { #less }
      else if (a.totalReads < b.totalReads) { #greater }
      else { #equal }
    });
    let taken = sorted.values().take(count);
    taken.map(func(n : Novel) : NovelPublic { toPublic(n) }).toArray();
  };

  public func rateNovel(novel : Novel, rating : Nat) {
    novel.ratingSum += rating;
    novel.ratingCount += 1;
  };
};
