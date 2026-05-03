import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import UserTypes "../types/user";

module {
  public type UserProfile = UserTypes.UserProfile;
  public type UserProfilePublic = UserTypes.UserProfilePublic;

  public func toPublic(u : UserProfile) : UserProfilePublic {
    {
      id = u.id;
      username = u.username;
      bio = u.bio;
      avatarUrl = u.avatarUrl;
      isAuthor = u.isAuthor;
      novelsRead = u.novelsRead;
      chaptersRead = u.chaptersRead;
      createdAt = u.createdAt;
    };
  };

  public func new(id : Principal, username : Text) : UserProfile {
    {
      id;
      var username = username;
      var bio = "";
      var avatarUrl = "";
      var isAuthor = false;
      var novelsRead = 0;
      var chaptersRead = 0;
      var createdAt = Time.now();
    };
  };

  public func findByPrincipal(users : List.List<UserProfile>, id : Principal) : ?UserProfile {
    users.find(func(u) { Principal.equal(u.id, id) });
  };

  public func searchByUsername(users : List.List<UserProfile>, term : Text) : [UserProfilePublic] {
    let lower = term.toLower();
    users.filter(func(u) { u.username.toLower().contains(#text lower) })
      .map<UserProfile, UserProfilePublic>(func(u) { toPublic(u) })
      .toArray();
  };
};
