"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import AllCourses from "./pages/courses/AllCourses";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserSignUp from "./pages/user/UserSignUp";
import UserSignIn from "./pages/user/UserSignIn";
import AdminSignIn from "./pages/admin/AdminSignIn";
import AdminSignUp from "./pages/admin/AdminSignUp";
import AdminUpdateCourse from "./pages/admin/AdminUpdateCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/user/sign-up" element={<UserSignUp />} />
        <Route path="/user/sign-in" element={<UserSignIn />} />
        <Route path="/admin/sign-up" element={<AdminSignUp />} />
        <Route path="/admin/sign-in" element={<AdminSignIn />} />
        <Route
          path="/admin/update-course/:id"
          element={<AdminUpdateCourse />}
        />
      </Routes>
    </Router>
  );
}
export default App;
