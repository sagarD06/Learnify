"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import Header from "../Header";
import Footer from "../Footer";
import { AuthContext } from "../../context/AuthContext";
import {Card} from "../Card"
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/courses",
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-3 py-10">
            {courses.map((item, idx) => (
              <Link
                href={item?.link}
                key={idx}
                className="relative group  block p-2 h-full w-full"
              >
                <Card key={idx} item={item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
