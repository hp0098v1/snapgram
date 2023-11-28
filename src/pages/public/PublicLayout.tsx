import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/lib/zustand/useAuthStore";

const PublicLayout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img
            className="hidden lg:block h-screen w-1/2 object-cover bg-no-repeat"
            src="/assets/images/side-img.svg"
            alt="logo"
          />
        </>
      )}
    </>
  );
};

export default PublicLayout;
