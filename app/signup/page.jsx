"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StarsCanvas from "../canvas/Stars";
import { motion } from "framer-motion";
import EarthCanvas from "../canvas/Earth";
import { slideIn } from "@/utils/motion";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const router = useRouter();

  const createUser = (e) => {
    const theme = 1; // Always set to theme 1, themes got the boot I'm dying as is
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    } else {
      setPasswordsMatch(true);
    }

    const user = {
      username,
      password,
      email,
      theme,
    };

    const endpoint = "http://localhost:8088/kanban_board/users";
    console.log(user);
    axios
      .post(endpoint, user)
      .then((response) => router.push("/login?userCreated=true")) // Use router.push for navigation
      .catch((error) => {
        // Handle error
        console.error("There was an error!", error);
      });
  };

  return (
    <div
      className={` flex xl:flex-row flex-col-reverse gap-10 overflow-hidden bg-gray-900 z-0 relative`}
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <motion.div
        className="flex-[0.75] p-8 rounded-2xl"
        initial={{ x: "-100%" }} // start from the left
        animate={{ x: 0 }} // animate to its original position
        transition={{ type: "spring", stiffness: 60, damping: 20 }} // adjust transition as needed
      >
        <section className="relative z-0">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white z-0 relative"
            >
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              Necessitating Changes
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create your user account!
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={createUser}>
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter Your Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your Username"
                      required
                      pattern=".{3,}" // username needs to be above 3 characters
                      title="Username must be at least 3 characters"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Example@gmail.com"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // email must have @
                      title="Please enter a valid email address, typically with @ and a domain"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Create Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      pattern=".{6,}" // password needs to be above 6 characters
                      title="Password must be at least 6 characters"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      pattern=".{6,}" // confirmPassword needs to be above 6 characters
                      title="Confirm Password must be at least 6 characters"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                    {!passwordsMatch && (
                      <div className=" text-red text-sm pt-3">
                        Passwords do not match!
                      </div>
                    )}
                  </div>

                  <div className="flex items-start pt-5">
                    <div className="flex items-start"></div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Log in Here!
                      </a>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create User Account!
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      <motion.div
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        initial={{ x: "100%" }} // start from the right
        animate={{ x: 0 }} // animate to its original position
        transition={{ type: "spring", stiffness: 60, damping: 20 }} // adjust transition as needed
      >
        <EarthCanvas />
      </motion.div>
      <StarsCanvas />
    </div>
  );
};

export default SignUp;
