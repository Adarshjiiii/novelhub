import List "mo:core/List";
import NovelTypes "types/novel";
import UserTypes "types/user";

module {
  // ── Old inline types (copied from .old/src/backend/types/) ───────
  type OldUserId = Principal;
  type OldTimestamp = Int;
  type OldNovelId = Nat;

  type OldUserProfile = {
    id : OldUserId;
    var username : Text;
    var bio : Text;
    var avatarUrl : Text;
    var novelsRead : Nat;
    var chaptersRead : Nat;
    var createdAt : OldTimestamp;
  };

  type OldNovel = {
    id : OldNovelId;
    title : Text;
    authorPrincipal : OldUserId;
    authorName : Text;
    description : Text;
    coverImage : Text;
    genre : Text;
    tags : [Text];
    var totalReads : Nat;
    var ratingSum : Nat;
    var ratingCount : Nat;
    createdAt : OldTimestamp;
  };

  // ── Migration input / output types ───────────────────────────────
  public type OldActor = {
    users : List.List<OldUserProfile>;
    novels : List.List<OldNovel>;
  };

  public type NewActor = {
    users : List.List<UserTypes.UserProfile>;
    novels : List.List<NovelTypes.Novel>;
  };

  // ── Migration function ────────────────────────────────────────────
  public func run(old : OldActor) : NewActor {
    let users = old.users.map<OldUserProfile, UserTypes.UserProfile>(
      func(u) {
        {
          id = u.id;
          var username = u.username;
          var bio = u.bio;
          var avatarUrl = u.avatarUrl;
          var isAuthor = false;
          var novelsRead = u.novelsRead;
          var chaptersRead = u.chaptersRead;
          var createdAt = u.createdAt;
        }
      }
    );
    let novels = old.novels.map<OldNovel, NovelTypes.Novel>(
      func(n) {
        {
          id = n.id;
          title = n.title;
          authorPrincipal = n.authorPrincipal;
          authorName = n.authorName;
          description = n.description;
          coverImage = n.coverImage;
          genre = n.genre;
          tags = n.tags;
          var coAuthors = [] : [NovelTypes.UserId];
          var totalReads = n.totalReads;
          var ratingSum = n.ratingSum;
          var ratingCount = n.ratingCount;
          createdAt = n.createdAt;
        }
      }
    );
    { users; novels };
  };
};
