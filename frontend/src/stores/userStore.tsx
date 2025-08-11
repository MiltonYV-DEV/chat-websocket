import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: number;
  username: string;
  email: string;
  is_active: number;
}

type AuthState = {
  user: User | null;
  token: string | null;
  hasHydrated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setHasHydrated: (v: boolean) => void;
  verifySession: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      hasHydrated: false,

      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      setHasHydrated: (v) => set({ hasHydrated: v }),

      verifySession: async () => {
        const { token } = get();
        if (!token) return false;
        // TODO: valida token con API
        const ok = true;
        if (!ok) get().logout();
        return ok;
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      // Guarda solo lo necesario
      partialize: (s) => ({ user: s.user, token: s.token }),
      // Hook de rehidratación post-carga
      onRehydrateStorage: () => (state, error) => {
        if (error) console.error("Error rehydrating:", error);
        state?.verifySession?.().finally(() => state?.setHasHydrated?.(true));
      },
      version: 1,
    },
  ),
);
