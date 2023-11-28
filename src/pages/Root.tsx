import { Routes, Route } from "react-router-dom";

import QueryProvider from "@/lib/react-query/QueryProvider";

import { Toaster } from "@/components/ui/toaster";
import { PublicLayout, SignIn, SignUp } from "./public";
import { Home, PrivateLayout } from "./private";

const Root = () => {
  return (
    <QueryProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>

      <Toaster />
    </QueryProvider>
  );
};

export default Root;
