import List "mo:core/List";
import Principal "mo:core/Principal";
import FriendTypes "../types/friend";
import Time "mo:core/Time";

module {
  public type FriendRequest = FriendTypes.FriendRequest;

  public func sendRequest(requests : List.List<FriendRequest>, from : Principal, to : Principal) {
    let exists = requests.find(func(r) {
      Principal.equal(r.from, from) and Principal.equal(r.to, to)
    });
    switch (exists) {
      case (?_) {};
      case null {
        requests.add({
          from;
          to;
          status = #pending;
          createdAt = Time.now();
        });
      };
    };
  };

  public func acceptRequest(requests : List.List<FriendRequest>, from : Principal, to : Principal) {
    requests.mapInPlace(func(r) {
      if (Principal.equal(r.from, from) and Principal.equal(r.to, to) and r.status == #pending) {
        { r with status = #accepted }
      } else { r }
    });
  };

  public func declineRequest(requests : List.List<FriendRequest>, from : Principal, to : Principal) {
    requests.mapInPlace(func(r) {
      if (Principal.equal(r.from, from) and Principal.equal(r.to, to) and r.status == #pending) {
        { r with status = #declined }
      } else { r }
    });
  };

  public func getFriends(requests : List.List<FriendRequest>, userId : Principal) : [Principal] {
    requests.filter(func(r) {
      r.status == #accepted and
      (Principal.equal(r.from, userId) or Principal.equal(r.to, userId))
    })
    .map<FriendRequest, Principal>(func(r) {
      if (Principal.equal(r.from, userId)) { r.to } else { r.from }
    })
    .toArray();
  };

  public func removeFriend(requests : List.List<FriendRequest>, userId : Principal, friendId : Principal) {
    requests.mapInPlace(func(r) {
      if (r.status == #accepted and (
        (Principal.equal(r.from, userId) and Principal.equal(r.to, friendId)) or
        (Principal.equal(r.from, friendId) and Principal.equal(r.to, userId))
      )) {
        { r with status = #declined }
      } else { r }
    });
  };

  public func hasPendingRequest(requests : List.List<FriendRequest>, from : Principal, to : Principal) : Bool {
    requests.find(func(r) {
      Principal.equal(r.from, from) and Principal.equal(r.to, to) and r.status == #pending
    }) != null;
  };
};
