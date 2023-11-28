import { Link } from "react-router-dom";

import { useSignOutHook } from "@/hooks/useSignOutHook";
import { useAuthStore } from "@/lib/zustand/useAuthStore";
import { Button } from "../ui/button";

const Topbar = () => {
  // Hooks
  const { signOutHandler } = useSignOutHook();

  // Zustand
  const { user } = useAuthStore();

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={120}
            height={325}
          />
        </Link>
        <div className="flex gap-4">
          <Button
            onClick={signOutHandler}
            variant="ghost"
            className="shad-button_ghost"
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>

          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
