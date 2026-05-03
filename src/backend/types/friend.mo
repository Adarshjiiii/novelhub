import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type Timestamp = CommonTypes.Timestamp;

  public type FriendRequestStatus = {
    #pending;
    #accepted;
    #declined;
  };

  public type FriendRequest = {
    from : UserId;
    to : UserId;
    status : FriendRequestStatus;
    createdAt : Timestamp;
  };
};
