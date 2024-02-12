"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar/SidebarOne";
import axios from "axios";

const Dashboard = () => {
  // Create router for authentication redirection
  const router = useRouter();

  // State to hold the username
  const [username, setUsername] = useState("");
  const bearerToken = sessionStorage.getItem("token");

  // Check if user is logged in by if the bearer token is empty or not.
  useEffect(() => {
    if (!bearerToken) {
      router.push("/login"); // Go to login page if user is not logged in (bearer token empty)
    } else {
      console.log(bearerToken);
    }
  }, []);

  useEffect(() => {
    if (bearerToken) {
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
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
          setUsername(username);
          sessionStorage.setItem("username", username);
          console.log(username);
        });
    }
  }, [bearerToken]);

  return (
    <>
      {/* Header for the main dashboard. Needed here for conditional rendering */}
      <Navbar />
      {/* <Sidebar router={router} />; */}
      <section className="max-container">
        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <h1 className="head-text">
            Welcome back{" "}
            <span className="blue-gradient_text font-semibold drop-shadow">
              {username}!
            </span>
          </h1>
        </motion.div>

        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p>
              I'm a full-stack developer with a passion for creating beautiful
              and functional websites and applications. I am always looking for
              new and exicitng projects to work on, so if you have an idea you'd
              like to make a reality, please feel free to reach out!
            </p>
          </div>
        </motion.div>
      </section>
      {/* Footer for the main dashboard. Needed here for conditional rendering */}
      <Footer />
    </>
  );
};

export default Dashboard;
