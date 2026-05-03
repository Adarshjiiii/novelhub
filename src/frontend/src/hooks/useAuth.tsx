import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export interface AuthState {
  principal: string | null;
  identity: unknown | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

export function useAuth(): AuthState {
  const { identity, loginStatus, login, clear } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success" && !!identity;
  const isLoading = loginStatus === "logging-in";
  const principal = identity?.getPrincipal()?.toText() ?? null;

  return {
    principal,
    identity: identity ?? null,
    isAuthenticated,
    isLoading,
    login: async () => {
      login();
    },
    logout: clear,
  };
}
