"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import Header from "../Header";
import Footer from "../Footer";
import { AuthContext } from "../../context/AuthContext";
import { HoverEffect } from "../ui/CardHoverEffect";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/admin/all-courses",
          { headers: { token: user } }
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    getCourses();
  }, []);
  return (
    <div className="relative min-h-screen dark bg-slate-950 w-full flex flex-col z-50">
      <Header className={"z-0 border-b border-slate-700 shadow-lg"} />
      <div className="mt-20">
        <h2 className="text-zinc-100 text-xl text-center font-bold tracking-wide mt-8">
          Your Courses
        </h2>
        <div className="max-w-7xl mx-auto px-8">
          <HoverEffect items={courses} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
