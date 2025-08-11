import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
  is_active: number;
}

type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  hydrateFromStorage: () => void; // 👈 para App
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    // ✅ guardar en el estado
    set({ user, token });
    // y también en localStorage (tu enfoque)
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("username", user.username);
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    console.log("Cerraste sesion");
  },

  hydrateFromStorage: () => {
    const token = localStorage.getItem("access_token");
    let user: User | null = null;
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        user = JSON.parse(raw) as User;
      } catch {
        user = null;
      }
    }
    set({ token, user });
  },
}));
