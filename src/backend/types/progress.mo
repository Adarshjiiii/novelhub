import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type NovelId = CommonTypes.NovelId;
  public type ChapterId = CommonTypes.ChapterId;
  public type Timestamp = CommonTypes.Timestamp;

  public type ReadingProgress = {
    userId : UserId;
    novelId : NovelId;
    var lastChapterId : ChapterId;
    var lastChapterNumber : Nat;
    var percentComplete : Float;
    var updatedAt : Timestamp;
  };

  public type ReadingProgressPublic = {
    userId : UserId;
    novelId : NovelId;
    lastChapterId : ChapterId;
    lastChapterNumber : Nat;
    percentComplete : Float;
    updatedAt : Timestamp;
  };

  public type SaveProgressRequest = {
    novelId : NovelId;
    lastChapterId : ChapterId;
    lastChapterNumber : Nat;
    percentComplete : Float;
  };
};
