import React, { useContext } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import { AuthContext } from "../context/AuthContext";

export const Card = ({ item, courses, setUpdatedCourses }) => {
  const { user } = useContext(AuthContext);
  const path = useLocation();
  const isAdmin = path.pathname.includes("admin");
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/admin/delete-course/${id}`,
        { headers: { token: user } }
      );
      if (response.data.success) {
        setUpdatedCourses(courses.filter((course) => course._id !== id));
      }
    } catch (error) {
      console.error("Error while deleting", error);
    }
  }

  return (
    <div className="flex relative w-full text-neutral-200 cursor-pointer flex-col rounded-2xl transition-all duration-300 hover:-translate-y-2 bg-slate-900">
      <div className="flex flex-col">
        <img
          alt="Ad hoc classes"
          className="size-full rounded-t-2xl bg-cover"
          src={item.imageUrl}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div className="flex flex-col w-full justify-between gap-2">
          <h3 className="w-full truncate text-xl font-bold capitalize tracking-tighter md:text-2xl">
            {item.title}
          </h3>
          <p className="text-lg tracking-tight text-primary/80 line-clamp-1 overflow-hidden">
            {item.description}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {isAdmin ? (
            <div className="flex justify-center gap-x-2">
              <Link to={`/admin/update-course/${item._id}`}>
                <PrimaryButton
                  title={"Edit"}
                  className={"bg-gradient-to-b from-blue-400 to-blue-700"}
                />
              </Link>
              <PrimaryButton
                title={"Upload"}
                className={"bg-gradient-to-b from-orange-400 to-orange-700"}
                disabled={true}
              />
              <PrimaryButton
                title={"Delete"}
                className={"bg-gradient-to-b from-red-400 to-red-700"}
                onClick={() => handleDelete(item._id)}
              />
            </div>
          ) : item.price ? (
            <PrimaryButton
              title={`Buy at Rs. ${item.price}/-`}
              className={"bg-gradient-to-b from-orange-400 to-orange-700"}
            />
          ) : (
            <PrimaryButton
              title={"View Course"}
              className={"bg-gradient-to-b from-blue-400 to-blue-700"}
            />
          )}
        </div>
      </div>
    </div>
  );
};
