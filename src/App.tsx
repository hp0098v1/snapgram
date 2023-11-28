import { Routes, Route } from "react-router-dom";

import QueryProvider from "@/lib/react-query/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { PublicLayout, SignIn, SignUp } from "@/pages/public";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  PrivateLayout,
  Profile,
  Saved,
  UpdateProfile,
} from "@/pages/private";

const App = () => {
  return (
    <main className="flex h-screen">
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
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
          </Route>
        </Routes>

        <Toaster />
      </QueryProvider>
    </main>
  );
};

export default App;
