import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import UserSignUp from "./components/user/UserSignUp.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/user/sign-up", element: <UserSignUp /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
