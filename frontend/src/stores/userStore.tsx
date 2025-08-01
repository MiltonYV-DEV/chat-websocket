import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
  is_active: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    set({ user: null, token: null });

    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("accsess_token");
    localStorage.removeItem("user");
  },
}));
