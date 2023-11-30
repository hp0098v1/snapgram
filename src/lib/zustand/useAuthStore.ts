import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

interface IAuthStore {
  user: IUser;
  isLoading: boolean;
  setUser: (user: IUser) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (bool: boolean) => void;
  checkAuthUser: () => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      user: INITIAL_USER,
      isLoading: false,
      isAuthenticated: false,
      setIsAuthenticated: (bool: boolean) =>
        set(() => ({ isAuthenticated: bool })),
      setUser: (user: IUser) =>
        set(() => ({ user: { ...get().user, ...user } })),
      checkAuthUser: async () => {
        try {
          const currentAccount = await getCurrentUser();

          if (currentAccount) {
            get().setUser({
              id: currentAccount.$id,
              name: currentAccount.name,
              username: currentAccount.username,
              email: currentAccount.email,
              imageUrl: currentAccount.imageUrl,
              bio: currentAccount.bio,
            });
            get().setIsAuthenticated(true);

            return true;
          }

          return false;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      logout: async () => {
        set(() => ({ user: INITIAL_USER, isAuthenticated: false }));
      },
    }),
    { name: "auth" }
  )
);
