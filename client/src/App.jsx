"use client";

import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { Vortex } from "./components/ui/Vortex";

function App() {
  return (
    <div className="min-h-screen relative dark bg-black w-full flex flex-col justify-center items-center">
      <Header />
      <Vortex className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full z-50">
        {/* <Navbar className="top-2" /> */}
        <div className="flex flex-col gap-y-3">
          <h1 className="text-3xl md:text-6xl text-center text-neutral-800 dark:text-neutral-200">
            Welcome to <span className="text-[#A594F9]">Learnify</span>
          </h1>
          <p className="text-lg md:text-2xl text-center text-neutral-700 dark:text-neutral-400">
            A brand new platform for continuous learning and professional
            upskilling!
          </p>
        </div>
        <div className="flex gap-x-5 mt-5 md:mt-9">
          <Link to={"/user/sign-up"}>
            <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[#ae58f5] px-8 py-2 bg-[#8d05fc] rounded-md text-white font-light transition duration-200 ease-linear">
              Signup
            </button>
          </Link>
          <Link to={"/courses"}>
            <button className="px-4 py-2 text-neutral-200 backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
              Explore Courses
            </button>
          </Link>
        </div>
      </Vortex>
      <Footer classname={"absolute"} />
    </div>
  );
}

export default App;
