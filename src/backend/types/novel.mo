import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type NovelId = CommonTypes.NovelId;
  public type ChapterId = CommonTypes.ChapterId;
  public type Timestamp = CommonTypes.Timestamp;

  public type Chapter = {
    id : ChapterId;
    novelId : NovelId;
    title : Text;
    content : Text;
    chapterNumber : Nat;
    createdAt : Timestamp;
  };

  public type Novel = {
    id : NovelId;
    title : Text;
    authorPrincipal : UserId;
    authorName : Text;
    description : Text;
    coverImage : Text;
    genre : Text;
    tags : [Text];
    var coAuthors : [UserId];
    var totalReads : Nat;
    var ratingSum : Nat;
    var ratingCount : Nat;
    createdAt : Timestamp;
  };

  public type NovelPublic = {
    id : NovelId;
    title : Text;
    authorPrincipal : UserId;
    authorName : Text;
    description : Text;
    coverImage : Text;
    genre : Text;
    tags : [Text];
    coAuthors : [UserId];
    totalReads : Nat;
    avgRating : Float;
    ratingCount : Nat;
    createdAt : Timestamp;
  };

  public type CreateNovelRequest = {
    title : Text;
    description : Text;
    coverImage : Text;
    genre : Text;
    tags : [Text];
  };

  public type CreateChapterRequest = {
    novelId : NovelId;
    title : Text;
    content : Text;
    chapterNumber : Nat;
  };

  public type RatingRequest = {
    novelId : NovelId;
    rating : Nat; // 1-5
  };
};
