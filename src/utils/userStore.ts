import create from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  userInfo: string | null;
  setUserInfo: (userId: string) => void;
  performLogout: () => void;
}
export const useUserStore = create<UserStore>()((set) => ({
  userInfo: null,

  setUserInfo: (userId) => set((state) => ({ userInfo: userId })),

  performLogout: () => set(() => ({ userInfo: null })),
}));
