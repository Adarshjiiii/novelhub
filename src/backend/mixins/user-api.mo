import List "mo:core/List";
import UserTypes "../types/user";
import UserLib "../lib/user";

mixin (users : List.List<UserLib.UserProfile>) {

  public shared ({ caller }) func createProfile(username : Text, bio : Text, avatarUrl : Text) : async Bool {
    switch (UserLib.findByPrincipal(users, caller)) {
      case (?_) { false };
      case null {
        let profile = UserLib.new(caller, username);
        profile.bio := bio;
        profile.avatarUrl := avatarUrl;
        users.add(profile);
        true;
      };
    };
  };

  public shared ({ caller }) func updateProfile(username : Text, bio : Text, avatarUrl : Text) : async Bool {
    switch (UserLib.findByPrincipal(users, caller)) {
      case (?profile) {
        profile.username := username;
        profile.bio := bio;
        profile.avatarUrl := avatarUrl;
        true;
      };
      case null { false };
    };
  };

  public shared query ({ caller }) func getMyProfile() : async ?UserTypes.UserProfilePublic {
    switch (UserLib.findByPrincipal(users, caller)) {
      case (?profile) { ?UserLib.toPublic(profile) };
      case null { null };
    };
  };

  public query func getProfile(userId : UserTypes.UserId) : async ?UserTypes.UserProfilePublic {
    switch (UserLib.findByPrincipal(users, userId)) {
      case (?profile) { ?UserLib.toPublic(profile) };
      case null { null };
    };
  };

  public query func searchUsers(term : Text) : async [UserTypes.UserProfilePublic] {
    UserLib.searchByUsername(users, term);
  };
  /// Promote the caller to author status.
  public shared ({ caller }) func becomeAuthor() : async Bool {
    switch (UserLib.findByPrincipal(users, caller)) {
      case (?profile) {
        profile.isAuthor := true;
        true;
      };
      case null { false };
    };
  };
};
