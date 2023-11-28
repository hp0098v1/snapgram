import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSignOutAccount } from "@/lib/react-query/queries";
import { useAuthStore } from "@/lib/zustand/useAuthStore";

export const useSignOutHook = () => {
  const navigate = useNavigate();

  // Zustand
  const { logout } = useAuthStore();

  // Queries
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const signOutHandler = () => {
    signOut();
    logout();
  };

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return { signOutHandler };
};
