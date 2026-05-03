import Map "mo:core/Map";
import ProgressTypes "../types/progress";
import ProgressLib "../lib/progress";

mixin (progressMap : Map.Map<Text, ProgressLib.ReadingProgress>) {

  public shared ({ caller }) func saveProgress(req : ProgressTypes.SaveProgressRequest) : async Bool {
    ProgressLib.save(progressMap, caller, req);
    true;
  };

  public shared query ({ caller }) func getProgress(novelId : ProgressTypes.NovelId) : async ?ProgressTypes.ReadingProgressPublic {
    ProgressLib.get(progressMap, caller, novelId);
  };

  public shared query ({ caller }) func getReadingHistory() : async [ProgressTypes.ReadingProgressPublic] {
    ProgressLib.historyForUser(progressMap, caller);
  };
};
