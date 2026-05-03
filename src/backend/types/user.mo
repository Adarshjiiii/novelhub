import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;

  public type UserProfile = {
    id : UserId;
    var username : Text;
    var bio : Text;
    var avatarUrl : Text;
    var isAuthor : Bool;
    var novelsRead : Nat;
    var chaptersRead : Nat;
    var createdAt : CommonTypes.Timestamp;
  };

  public type UserProfilePublic = {
    id : UserId;
    username : Text;
    bio : Text;
    avatarUrl : Text;
    isAuthor : Bool;
    novelsRead : Nat;
    chaptersRead : Nat;
    createdAt : CommonTypes.Timestamp;
  };
};
