"use client";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils.js";
import { BackgroundBeamsWithCollision } from "../../components/ui/BackgroundBeamsWithCollision.jsx";

const AdminSignUp = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/v1/admin/sign-up",
      {
        firstName,
        lastName,
        email,
        password,
      }
    );
    console.log(response.data.success);
    if (response.data.success) {
      navigate("/admin/sign-in");
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
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="Tyler"
                  type="text"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Durden"
                  type="text"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </LabelInputContainer>
            </div>
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
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign up &rarr;
              <BottomGradient />
            </button>
          </form>
          <p className="text-white text-center">
            Already have an account?{" "}
            <Link to="/admin/sign-in" className="text-purple-600">
              Sign in
            </Link>
          </p>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default AdminSignUp;
