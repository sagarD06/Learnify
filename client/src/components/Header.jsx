"use client";
import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="top-0 dark z-50 bg-transparent absolute w-full flex justify-between items-center px-5 py-3">
      <h1 className="text-3xl font-bold text-neutral-100 text-center p-4">
        Learnify
      </h1>
      {user ? (
        <button
          className="relative inline-flex h-12 w-24 overflow-hidden rounded-full p-[1px]"
          onClick={() => logout()}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Logout
          </span>
        </button>
      ) : (
        <Link to={"/user/sign-in"}>
          <button className="relative inline-flex h-12 w-24 overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Login
            </span>
          </button>
        </Link>
      )}
    </div>
  );
};

export default Header;
