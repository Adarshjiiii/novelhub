import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type NovelId = CommonTypes.NovelId;
  public type ChapterId = CommonTypes.ChapterId;
  public type Timestamp = CommonTypes.Timestamp;

  /// Live collaborative session for a chapter.
  public type CollabSession = {
    chapterId : ChapterId;
    novelId : NovelId;
    var activeEditors : [UserId];
    var lastContent : Text;
    var lastUpdated : Timestamp;
  };

  /// Immutable public view of a CollabSession (shared-safe).
  public type CollabSessionPublic = {
    chapterId : ChapterId;
    novelId : NovelId;
    activeEditors : [UserId];
    lastContent : Text;
    lastUpdated : Timestamp;
  };

  public type SaveDraftResult = {
    #ok;
    #err : Text;
  };
};
