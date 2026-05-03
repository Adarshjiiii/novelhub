import { c as createLucideIcon, a0 as useActor, ah as useQuery, ai as useQueryClient, a2 as createActor } from "./index-S5JeUSL8.js";
import { j as useMutation } from "./useAuthor-Dsu2eX6L.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function useJoinSession() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ chapterId, novelId }) => {
      if (!actor) throw new Error("Not connected");
      return actor.joinCollabSession(chapterId, novelId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collab-session", variables.chapterId.toString()]
      });
      queryClient.invalidateQueries({
        queryKey: ["active-sessions", variables.novelId.toString()]
      });
    }
  });
}
function useLeaveSession() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ chapterId }) => {
      if (!actor) throw new Error("Not connected");
      return actor.leaveCollabSession(chapterId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collab-session", variables.chapterId.toString()]
      });
      queryClient.invalidateQueries({
        queryKey: ["active-sessions", variables.novelId.toString()]
      });
    }
  });
}
function useSaveChapterDraft() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ chapterId, content }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveChapterDraft(chapterId, content);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collab-session", variables.chapterId.toString()]
      });
    }
  });
}
function useGetChapterDraft(chapterId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["collab-session", chapterId == null ? void 0 : chapterId.toString()],
    queryFn: async () => {
      if (!actor || chapterId === null) return null;
      return actor.getChapterDraft(chapterId);
    },
    enabled: !!actor && !isFetching && chapterId !== null,
    refetchInterval: 3e3,
    staleTime: 0
  });
}
function useGetActiveSessions(novelId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["active-sessions", novelId == null ? void 0 : novelId.toString()],
    queryFn: async () => {
      if (!actor || novelId === null) return [];
      return actor.getActiveSessions(novelId);
    },
    enabled: !!actor && !isFetching && novelId !== null,
    refetchInterval: 3e3,
    staleTime: 0
  });
}
export {
  Send as S,
  useSaveChapterDraft as a,
  useJoinSession as b,
  useLeaveSession as c,
  useGetActiveSessions as d,
  useGetChapterDraft as u
};
