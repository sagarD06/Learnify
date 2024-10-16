import React, { useState } from "react";
import BottomGradient from "./BottomGradient";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const isCorrect = password === confirmPassword;

  const path = useLocation();
  const isAdmin = path.pathname.includes("admin");
  const Api = isAdmin
    ? `http://localhost:3000/admin/`
    : `http://localhost:3000/user/`;

  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/admin", { email });
      alert("Email sent successfully. Please check your inbox.");
    } catch (error) {
      console.error("Went wrong in verifying email", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isAdmin) {
        await axios.patch("/admin/reset-password");
      } else {
        await axios.patch("/user/reset-password");
      }
    } catch (error) {
      console.error("Went wromg in reset password", error);
    }
  };

  return (
    <div className="min-h-screen dark w-[100%] flex justify-center items-center">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          Reset Password
        </h2>
        {!email ? (
          <>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                placeholder="Enter your mail to proceed"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              onClick={verifyEmail}
            >
              Submit &rarr;
              <BottomGradient />
            </button>
          </>
        ) : (
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={password}
                placeholder="••••••••"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="confirm password">Confirm Password</Label>
              <Input
                id="confirmPassword"
                value={confirmPassword}
                placeholder="••••••••"
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {isCorrect ? (
                <p className="text-green-700 text-xs">Password matched</p>
              ) : (
                <p className="text-green-700 text-xs"> Incorrect password</p>
              )}
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Update Password &rarr;
              <BottomGradient />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
