import React, { useContext } from "react";
import Layout from "./Layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import authContext from "./store/auth-context";
import NoticePage from "./pages/NoticePage";
import NoticeWritePage from "./pages/NoticeWritePage";
import UserPage from "./pages/UserPage";
import AdPage from "./pages/AdPage";
import AdRegisterPage from "./pages/AdRegisterPage";
import ForumPage from "./pages/ForumPage";
function App() {
  const ctx = useContext(authContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/users/login"
          element={ctx.isLoggedIn ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/users/signup"
          element={ctx.isLoggedIn ? <Navigate to="/" /> : <SignUpPage />}
        />
        <Route
          path="/notice"
          element={ctx.type === "admin" ? <NoticePage /> : <Navigate to="/" />}
        />
        <Route
          path="/notice/write"
          element={
            ctx.type === "admin" ? <NoticeWritePage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/user"
          element={ctx.type === "admin" ? <UserPage /> : <Navigate to="/" />}
        />
        <Route
          path="/ad"
          element={ctx.type === "advertise" ? <AdPage /> : <Navigate to="/" />}
        />
        <Route
          path="/ad/write"
          element={
            ctx.type === "advertise" ? <AdRegisterPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/forum"
          element={ctx.type === "admin" ? <ForumPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<h1>Page Not Found.</h1>} />
      </Routes>
    </Layout>
  );
}

export default App;
