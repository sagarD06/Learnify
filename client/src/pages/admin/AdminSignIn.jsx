"use client";
import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils.js";
import { BackgroundBeamsWithCollision } from "../../components/ui/BackgroundBeamsWithCollision.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import BottomGradient from "../../components/ui/BottomGradient.jsx";
import LabelInputContainer from "../../components/ui/LabelInputContainer.jsx";

const AdminSignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/v1/admin/sign-in",
      {
        email,
        password,
      }
    );
    if (response.data.success) {
      login(response.data.token);
      navigate("/admin/dashboard");
    } else {
      window.alert("Inavlid data");
    }
  };
  return (
    <div className="min-h-screen dark w-[100%] flex justify-center items-center">
      <BackgroundBeamsWithCollision>
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
            Welcome to <span className="text-purple-600">Learnify</span> 
          </h2>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Link className="text-purple-600 text-xs">forgot password?</Link>
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign in &rarr;
              <BottomGradient />
            </button>
          </form>
          <p className="text-white text-center">
            Already have an account? <Link to="/admin/sign-up" className="text-purple-600">Sign up</Link>
          </p>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default AdminSignIn;
