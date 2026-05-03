import { createActor } from "@/backend";
import type { CreateNovelRequest, NovelPublic } from "@/backend.d";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAuthorNovels() {
  const { actor, isFetching } = useActor(createActor);
  const { principal } = useAuth();
  return useQuery<NovelPublic[]>({
    queryKey: ["author-novels", principal],
    queryFn: async () => {
      if (!actor || !principal) return [];
      const all = await actor.getAllNovels();
      return all.filter((n) => n.authorPrincipal.toText() === principal);
    },
    enabled: !!actor && !isFetching && !!principal,
    staleTime: 2 * 60 * 1000,
  });
}

export function useBecomeAuthor() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean>({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.becomeAuthor();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
  });
}

export function useCreateNovel() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    bigint,
    Error,
    { req: CreateNovelRequest; authorName: string }
  >({
    mutationFn: async ({ req, authorName }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createNovel(req, authorName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["novels"] });
      queryClient.invalidateQueries({ queryKey: ["author-novels"] });
    },
  });
}

export function useUpdateNovel() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { novelId: bigint; req: CreateNovelRequest }
  >({
    mutationFn: async ({ novelId, req }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateNovel(novelId, req);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["novel", variables.novelId.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["author-novels"] });
    },
  });
}

export function useAddCoAuthor() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { novelId: bigint; coAuthor: Principal }>({
    mutationFn: async ({ novelId, coAuthor }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addCoAuthor(novelId, coAuthor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["author-novels"] });
    },
  });
}

export function useRemoveCoAuthor() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { novelId: bigint; coAuthor: Principal }>({
    mutationFn: async ({ novelId, coAuthor }) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeCoAuthor(novelId, coAuthor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["author-novels"] });
    },
  });
}

export function useAddChapter() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    bigint,
    Error,
    { title: string; content: string; chapterNumber: bigint; novelId: bigint }
  >({
    mutationFn: async ({ title, content, chapterNumber, novelId }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addChapter({ title, content, chapterNumber, novelId });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chapters", variables.novelId.toString()],
      });
    },
  });
}

export function useUpdateChapter() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { chapterId: bigint; title: string; content: string; novelId: bigint }
  >({
    mutationFn: async ({ chapterId, title, content }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateChapter(chapterId, title, content);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chapters", variables.novelId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "chapter",
          variables.novelId.toString(),
          variables.chapterId.toString(),
        ],
      });
    },
  });
}

export function useDeleteNovel() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { novelId: bigint }>({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      // Backend deleteNovel not yet exposed on this platform
      throw new Error("Delete is not yet available on this platform.");
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["author-novels"] });
      queryClient.invalidateQueries({ queryKey: ["novels"] });
      queryClient.invalidateQueries({
        queryKey: ["novel", variables.novelId.toString()],
      });
    },
  });
}

export function usePublishChapter() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    { __kind__: string; err?: string },
    Error,
    { chapterId: bigint; novelId: bigint }
  >({
    mutationFn: async ({ chapterId }) => {
      if (!actor) throw new Error("Not connected");
      return actor.publishChapter(chapterId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chapters", variables.novelId.toString()],
      });
    },
  });
}
