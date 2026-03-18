import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import ProtectedRoute from "./layout/ProtectedRoute.jsx";
import PublicRoute from "./layout/PublicRoute.jsx";
import {
  Landing,
  Dashboard,
  GitHub,
  Music,
  Pomodoro,
  Task,
  Calendar,
  Weather,
  PasswordGenerator,
  Kanban,
  Login,
  Signup,
  Chat
} from "./features/index.js";
import Profile from "./layout/Profile.jsx";

const router = createBrowserRouter([
  // Public pages — redirect to /dashboard if already logged in
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
    ],
  },

  // Protected app pages (require login)
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "music",
            element: <Music />,
          },
          {
            path: "github",
            element: <GitHub />,
          },
          {
            path: "pomodoro",
            element: <Pomodoro />,
          },
          {
            path: "task",
            element: <Task />,
          },
          {
            path: "calendar",
            element: <Calendar />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "weather",
            element: <Weather />,
          },
          {
            path: "password-generator",
            element: <PasswordGenerator />,
          },
          {
            path: "kanban",
            element: <Kanban />,
          },
          {
            path: "chat",
            element: <Chat />,
          },
        ],
      },
    ],
  },
]);

export default router;
