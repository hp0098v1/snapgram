import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/lib/zustand/useAuthStore";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";

const PrivateLayout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/sign-in" />
      ) : (
        <div className="w-full md:flex">
          <Topbar />
          <LeftSidebar />

          <section className="flex flex-1 h-full">
            <Outlet />
          </section>

          <Bottombar />
        </div>
      )}
    </>
  );
};

export default PrivateLayout;
