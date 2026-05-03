import Map "mo:core/Map";
import Principal "mo:core/Principal";
import ProgressTypes "../types/progress";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

module {
  public type ReadingProgress = ProgressTypes.ReadingProgress;
  public type ReadingProgressPublic = ProgressTypes.ReadingProgressPublic;
  public type SaveProgressRequest = ProgressTypes.SaveProgressRequest;

  public func toPublic(p : ReadingProgress) : ReadingProgressPublic {
    {
      userId = p.userId;
      novelId = p.novelId;
      lastChapterId = p.lastChapterId;
      lastChapterNumber = p.lastChapterNumber;
      percentComplete = p.percentComplete;
      updatedAt = p.updatedAt;
    };
  };

  // Composite key: principalText # "-" # novelId
  public func makeKey(userId : Principal, novelId : Nat) : Text {
    userId.toText() # "-" # novelId.toText();
  };

  public func save(
    progressMap : Map.Map<Text, ReadingProgress>,
    userId : Principal,
    req : SaveProgressRequest,
  ) {
    let key = makeKey(userId, req.novelId);
    switch (progressMap.get(key)) {
      case (?existing) {
        existing.lastChapterId := req.lastChapterId;
        existing.lastChapterNumber := req.lastChapterNumber;
        existing.percentComplete := req.percentComplete;
        existing.updatedAt := Time.now();
      };
      case null {
        progressMap.add(key, {
          userId;
          novelId = req.novelId;
          var lastChapterId = req.lastChapterId;
          var lastChapterNumber = req.lastChapterNumber;
          var percentComplete = req.percentComplete;
          var updatedAt = Time.now();
        });
      };
    };
  };

  public func get(
    progressMap : Map.Map<Text, ReadingProgress>,
    userId : Principal,
    novelId : Nat,
  ) : ?ReadingProgressPublic {
    let key = makeKey(userId, novelId);
    switch (progressMap.get(key)) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  public func historyForUser(
    progressMap : Map.Map<Text, ReadingProgress>,
    userId : Principal,
  ) : [ReadingProgressPublic] {
    let userIdText = userId.toText();
    let prefix = userIdText # "-";
    progressMap.entries()
      .filter(func(kv) { let (k, _) = kv; k.startsWith(#text prefix) })
      .map(func(kv) { let (_, v) = kv; toPublic(v) })
      .toArray();
  };
};
