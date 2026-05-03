import List "mo:core/List";
import FriendTypes "../types/friend";
import FriendLib "../lib/friend";
import Principal "mo:core/Principal";

mixin (friendRequests : List.List<FriendLib.FriendRequest>) {

  public shared ({ caller }) func sendFriendRequest(to : FriendTypes.UserId) : async Bool {
    if (Principal.equal(caller, to)) { return false };
    if (FriendLib.hasPendingRequest(friendRequests, caller, to)) { return false };
    FriendLib.sendRequest(friendRequests, caller, to);
    true;
  };

  public shared ({ caller }) func acceptFriendRequest(from : FriendTypes.UserId) : async Bool {
    if (FriendLib.hasPendingRequest(friendRequests, from, caller)) {
      FriendLib.acceptRequest(friendRequests, from, caller);
      true;
    } else { false };
  };

  public shared ({ caller }) func declineFriendRequest(from : FriendTypes.UserId) : async Bool {
    if (FriendLib.hasPendingRequest(friendRequests, from, caller)) {
      FriendLib.declineRequest(friendRequests, from, caller);
      true;
    } else { false };
  };

  public shared query ({ caller }) func getFriends() : async [FriendTypes.UserId] {
    FriendLib.getFriends(friendRequests, caller);
  };

  public shared ({ caller }) func removeFriend(friendId : FriendTypes.UserId) : async Bool {
    let friends = FriendLib.getFriends(friendRequests, caller);
    let isFriend = friends.find(func(p) { Principal.equal(p, friendId) }) != null;
    if (isFriend) {
      FriendLib.removeFriend(friendRequests, caller, friendId);
      true;
    } else { false };
  };

  public shared query ({ caller }) func getPendingRequests() : async [FriendTypes.UserId] {
    friendRequests.filter(func(r) {
      Principal.equal(r.to, caller) and r.status == #pending
    })
    .map<FriendLib.FriendRequest, FriendTypes.UserId>(func(r) { r.from })
    .toArray();
  };
};
