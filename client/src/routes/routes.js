import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import UserSignUp from "../components/user/UserSignUp";
import UserSignIn from "../components/user/UserSignIn";
import UserDashboard from "../components/user/UserDashboard";
import AdminSignUp from "../components/admin/AdminSignUp";
import AdminSignIn from "../components/admin/AdminSignIn";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminCreateCourse from "../components/admin/AdminCreateCourse";
import AdminUpdateCourse from "../components/admin/AdminUpdateCourse";
import AdminDeleteCourse from "../components/admin/AdminDeleteCourse";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/user/sign-up", element: <UserSignUp /> },
  { path: "/user/sign-in", element: <UserSignIn /> },
  { path: "/user/dashboard", element: <UserDashboard /> },
  { path: "/admin/sign-up", element: <AdminSignUp /> },
  { path: "/admin/sign-in", element: <AdminSignIn /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/create-course", element: <AdminCreateCourse /> },
  { path: "/admin/update-course/:id", element: <AdminUpdateCourse /> },
  { path: "/admin/delete-course/:id", element: <AdminDeleteCourse /> },
]);
