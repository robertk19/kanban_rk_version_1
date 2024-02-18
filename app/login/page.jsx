"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StarsCanvas from "../canvas/Stars";

const LoginPage = () => {
  const [bearer, setBearer] = useState(
    typeof window !== "undefined" ? sessionStorage.getItem("token") : ""
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);

  const router = useRouter();

  const tryLogin = (e) => {
    e.preventDefault();
    const attempt = { username, password };
    console.log(attempt);
    const requestOptions = {
      auth: {
        username: username,
        password: password,
      },
    };
    axios
      .post("http://localhost:8088/kanban_board/auth/login", {}, requestOptions)
      .then((response) => {
        const token = response.data;
        setBearer(token);
        sessionStorage.setItem("token", token); // Set new item called "token" as the holder for bearer token. Can be called from any page with access to the session
        getUsername(token);
        router.push("/");
      });
  };

  const getUsername = (token) => {
    if (bearer) {
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(requestOptions);
      axios
        .get(
          "http://localhost:8088/kanban_board/auth/returnusername",
          requestOptions
        )
        .then((response) => {
          const username = response.data;
          getUserId(username, token);
          sessionStorage.setItem("username", username);
        });
    }
  };

  // First of the ATTEMPTED places to set userId, never fully discovered why this only set it conditionally. Second place set is in dashboard.
  const getUserId = (username, token) => {
    console.log(
      "getUserId called with username:",
      username,
      "and token:",
      token
    );
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `http://localhost:8088/kanban_board/users/username/${username}`,
        requestOptions
      )
      .then((response) => {
        console.log("Response from server:", response);
        const userid = response.data;
        sessionStorage.setItem("userid", userid);
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 relative z-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Necessitating Changes
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={tryLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required=""
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {/* {userCreated && (
                  <div className="text-white text-sm pt-4">
                    User has been successfully created!         THIS DID NOT
                  </div>
                )} */}
              </div>

              <div className="flex items-start">
                <div className="flex items-start"></div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <a
                    href="/signup"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </a>
                </div>
                <a
                  href="#"
                  className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Lost Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      <StarsCanvas />
    </section>
  );
};

export default LoginPage;
