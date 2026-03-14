import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import ProtectedRoute from "./layout/ProtectedRoute.jsx";
import {
  Dashboard,
  GitHub,
  Music,
  Pomodoro,
  Task,
  Calendar,
  Weather,
  Login,
  Signup,
} from "./features/index.js";
import Profile from "./layout/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
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
        ],
      },
    ],
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
]);

export default router;
