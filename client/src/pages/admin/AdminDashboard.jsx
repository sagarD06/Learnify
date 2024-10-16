"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Card } from "../../components/Card";

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
    <div className="relative min-h-96 dark bg-black w-full flex flex-col my-10">
      <div className="mt-5">
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
                <Card
                  key={idx}
                  item={item}
                  courses={courses}
                  setUpdatedCourses={setCourses}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
