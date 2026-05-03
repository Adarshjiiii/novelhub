import { createActor } from "@/backend";
import type { CollabSessionPublic } from "@/backend.d";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useJoinSession() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, { chapterId: bigint; novelId: bigint }>({
    mutationFn: async ({ chapterId, novelId }) => {
      if (!actor) throw new Error("Not connected");
      return actor.joinCollabSession(chapterId, novelId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collab-session", variables.chapterId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["active-sessions", variables.novelId.toString()],
      });
    },
  });
}

export function useLeaveSession() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, { chapterId: bigint; novelId: bigint }>({
    mutationFn: async ({ chapterId }) => {
      if (!actor) throw new Error("Not connected");
      return actor.leaveCollabSession(chapterId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collab-session", variables.chapterId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["active-sessions", variables.novelId.toString()],
      });
    },
  });
}

export function useSaveChapterDraft() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: string; err?: string },
    Error,
    { chapterId: bigint; content: string }
  >({
    mutationFn: async ({ chapterId, content }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveChapterDraft(chapterId, content);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collab-session", variables.chapterId.toString()],
      });
    },
  });
}

export function useGetChapterDraft(chapterId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CollabSessionPublic | null>({
    queryKey: ["collab-session", chapterId?.toString()],
    queryFn: async () => {
      if (!actor || chapterId === null) return null;
      return actor.getChapterDraft(chapterId);
    },
    enabled: !!actor && !isFetching && chapterId !== null,
    refetchInterval: 3000,
    staleTime: 0,
  });
}

export function useGetActiveSessions(novelId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CollabSessionPublic[]>({
    queryKey: ["active-sessions", novelId?.toString()],
    queryFn: async () => {
      if (!actor || novelId === null) return [];
      return actor.getActiveSessions(novelId);
    },
    enabled: !!actor && !isFetching && novelId !== null,
    refetchInterval: 3000,
    staleTime: 0,
  });
}
