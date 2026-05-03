import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import CollabTypes "../types/collab";

module {
  public type CollabSession = CollabTypes.CollabSession;
  public type CollabSessionPublic = CollabTypes.CollabSessionPublic;

  /// Convert mutable session to shared-safe public type.
  public func toPublic(s : CollabSession) : CollabSessionPublic {
    {
      chapterId = s.chapterId;
      novelId = s.novelId;
      activeEditors = s.activeEditors;
      lastContent = s.lastContent;
      lastUpdated = s.lastUpdated;
    };
  };

  /// Find a session by chapterId, or null if not found.
  public func findByChapterId(
    sessions : List.List<CollabSession>,
    chapterId : CollabTypes.ChapterId,
  ) : ?CollabSession {
    sessions.find(func(s) { s.chapterId == chapterId });
  };

  /// Create a new empty session for a chapter.
  public func newSession(
    chapterId : CollabTypes.ChapterId,
    novelId : CollabTypes.NovelId,
    initialContent : Text,
  ) : CollabSession {
    {
      chapterId;
      novelId;
      var activeEditors = [];
      var lastContent = initialContent;
      var lastUpdated = Time.now();
    };
  };

  /// Add an editor principal to a session's activeEditors (dedup).
  public func addEditor(session : CollabSession, editor : CollabTypes.UserId) : () {
    let already = session.activeEditors.find(func(p) { Principal.equal(p, editor) });
    switch (already) {
      case (?_) {};
      case null {
        session.activeEditors := session.activeEditors.concat([editor]);
      };
    };
  };

  /// Remove an editor principal from a session's activeEditors.
  public func removeEditor(session : CollabSession, editor : CollabTypes.UserId) : () {
    session.activeEditors := session.activeEditors.filter(func(p) { not Principal.equal(p, editor) });
  };

  /// Return all sessions that belong to a given novel (shared-safe).
  public func getByNovelId(
    sessions : List.List<CollabSession>,
    novelId : CollabTypes.NovelId,
  ) : [CollabSessionPublic] {
    sessions.filter(func(s) { s.novelId == novelId })
      .map<CollabSession, CollabSessionPublic>(func(s) { toPublic(s) })
      .toArray();
  };
};
