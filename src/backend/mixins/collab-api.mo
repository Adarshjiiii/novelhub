import List "mo:core/List";
import Time "mo:core/Time";
import CollabTypes "../types/collab";
import CollabLib "../lib/collab";
import NovelLib "../lib/novel";

mixin (
  sessions : List.List<CollabLib.CollabSession>,
  novels : List.List<NovelLib.Novel>,
  chapters : List.List<NovelLib.Chapter>,
) {

  /// Join (or create) a collab session for a chapter.
  public shared ({ caller }) func joinCollabSession(
    chapterId : CollabTypes.ChapterId,
    novelId : CollabTypes.NovelId,
  ) : async () {
    switch (CollabLib.findByChapterId(sessions, chapterId)) {
      case (?session) {
        CollabLib.addEditor(session, caller);
      };
      case null {
        let initContent = switch (chapters.find(func(c) { c.id == chapterId })) {
          case (?ch) { ch.content };
          case null { "" };
        };
        let session = CollabLib.newSession(chapterId, novelId, initContent);
        CollabLib.addEditor(session, caller);
        sessions.add(session);
      };
    };
  };

  /// Remove the caller from a collab session's active editors.
  public shared ({ caller }) func leaveCollabSession(
    chapterId : CollabTypes.ChapterId,
  ) : async () {
    switch (CollabLib.findByChapterId(sessions, chapterId)) {
      case (?session) { CollabLib.removeEditor(session, caller) };
      case null {};
    };
  };

  /// Save (overwrite) the draft content for a chapter session.
  /// Returns #ok on success or #err with reason on failure.
  public shared ({ caller }) func saveChapterDraft(
    chapterId : CollabTypes.ChapterId,
    content : Text,
  ) : async CollabTypes.SaveDraftResult {
    // Verify caller is author or co-author of the novel containing this chapter
    let novelIdOpt = switch (chapters.find(func(c) { c.id == chapterId })) {
      case (?ch) { ?ch.novelId };
      case null { return #err("Chapter not found") };
    };
    let novelId = switch (novelIdOpt) { case (?id) { id }; case null { return #err("Chapter not found") } };
    let authorized = switch (NovelLib.findById(novels, novelId)) {
      case (?novel) {
        novel.authorPrincipal == caller or
        novel.coAuthors.any(func(p : Principal) : Bool { p == caller });
      };
      case null { return #err("Novel not found") };
    };
    if (not authorized) { return #err("Not authorized") };
    // Update or create session with last-write-wins
    switch (CollabLib.findByChapterId(sessions, chapterId)) {
      case (?session) {
        session.lastContent := content;
        session.lastUpdated := Time.now();
      };
      case null {
        let session = CollabLib.newSession(chapterId, novelId, content);
        sessions.add(session);
      };
    };
    // Also update the chapter record (last-write-wins)
    chapters.mapInPlace(func(c) {
      if (c.id == chapterId) { { c with content } } else { c }
    });
    #ok;
  };

  /// Return the current draft session for a chapter, if any.
  public query func getChapterDraft(
    chapterId : CollabTypes.ChapterId,
  ) : async ?CollabTypes.CollabSessionPublic {
    switch (CollabLib.findByChapterId(sessions, chapterId)) {
      case (?session) { ?CollabLib.toPublic(session) };
      case null { null };
    };
  };

  /// Return all active collab sessions for a novel.
  public query func getActiveSessions(
    novelId : CollabTypes.NovelId,
  ) : async [CollabTypes.CollabSessionPublic] {
    sessions.filter(func(s) {
      s.novelId == novelId and s.activeEditors.size() > 0
    })
    .map<CollabLib.CollabSession, CollabTypes.CollabSessionPublic>(func(s) { CollabLib.toPublic(s) })
    .toArray();
  };

  /// Publish a chapter draft: copy lastContent into the chapter record.
  public shared ({ caller }) func publishChapter(
    chapterId : CollabTypes.ChapterId,
  ) : async CollabTypes.SaveDraftResult {
    // Verify caller is author or co-author
    let novelIdOpt = switch (chapters.find(func(c) { c.id == chapterId })) {
      case (?ch) { ?ch.novelId };
      case null { return #err("Chapter not found") };
    };
    let novelId = switch (novelIdOpt) { case (?id) { id }; case null { return #err("Chapter not found") } };
    let authorized = switch (NovelLib.findById(novels, novelId)) {
      case (?novel) {
        novel.authorPrincipal == caller or
        novel.coAuthors.any(func(p : Principal) : Bool { p == caller });
      };
      case null { return #err("Novel not found") };
    };
    if (not authorized) { return #err("Not authorized") };
    switch (CollabLib.findByChapterId(sessions, chapterId)) {
      case (?session) {
        let publishedContent = session.lastContent;
        // Copy session content to chapter record
        chapters.mapInPlace(func(c) {
          if (c.id == chapterId) { { c with content = publishedContent } } else { c }
        });
        // Clear session editors (session remains as history, editors cleared)
        session.activeEditors := [];
        #ok;
      };
      case null { #err("No active session for this chapter") };
    };
  };
};
