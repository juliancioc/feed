import { Route, Routes } from "react-router-dom";

import { Home } from "src/pages/home";
import { MyPosts } from "src/pages/myPosts";
import { Profile } from "src/pages/profile";
import { UserPosts } from "src/pages/userPosts";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-posts" element={<MyPosts />} />
      <Route path="/user/:id" element={<UserPosts />} />
    </Routes>
  );
};
