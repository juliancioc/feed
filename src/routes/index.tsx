import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("src/pages/home"));
const Profile = lazy(() => import("src/pages/profile"));
const MyPosts = lazy(() => import("src/pages/myPosts"));
const UserPosts = lazy(() => import("src/pages/userPosts"));
const Loading = lazy(() => import("src/components/loading"));

export const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/user/:id" element={<UserPosts />} />
      </Routes>
    </Suspense>
  );
};
