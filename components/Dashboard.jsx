"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { skills } from "../constants";
import NavCards from "@/components/NavCards";

// ...

<motion.div
  className="box"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    duration: 0.8,
    delay: 0.45,
    ease: [0, 0.71, 0.2, 1.01],
  }}
></motion.div>;

const Dashboard = () => {
  // Create router for authentication redirection
  const router = useRouter();

  // State to hold the username
  const [username, setUsername] = useState("");
  const bearerToken = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userid");

  // Check if user is logged in by if the bearer token is empty or not.
  useEffect(() => {
    if (!bearerToken) {
      router.push("/login"); // Go to login page if user is not logged in (bearer token empty)
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
          console.log(userId);

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
        });
    }
  }, [bearerToken]);

  return (
    <>
      <Navbar />
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
            Welcome{" "}
            <span className="blue-gradient_text font-semibold drop-shadow">
              {username}
            </span>{" "}
            to Necessitating Changes!
          </h1>
        </motion.div>

        <motion.div
          className="box pt-10"
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
              This project is an attempt to create a Kanban Board CRUD app for
              managing tasks. I've created this project to learn more about
              React, Node.js, JPA, while also honing my skills from other
              technologies in other projects that I have made in the past, such
              as tailwindcss, NextJS and 3D model elements.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="box pb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.45,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p>
              In the kanban board, you can drag and drop tasks from one column
              to another, make new tasks with a set priority, as well as update
              all elements of a task such as the title, description, priority,
              and status. You can also delete a task from the same dropdown
              menu.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="py-10 flex flex-col">
            <h3 className="subhead-text">Technologies Used</h3>

            <div className="mt-16 flex flex-wrap gap-12">
              {skills.map((skill) => (
                <div className="block-container w-32 h-32">
                  <div className="btn-back rounded-xl" />
                  <div className="btn-front rounded-xl flex justify-center items-center">
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className="w-1/2 h-1/2 object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="box pt-20"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.75,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="py-10 flex flex-col">
            <h3 className="subhead-text">
              Here are the main pages of this project:
            </h3>
          </div>
        </motion.div>

        <motion.div
          className="box pb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.9,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p>
              Here are the main pages for the project. Mostly, the project is
              limited to just the dashboard and the kanban board. The dashboard
              is where you are now, and the kanban board is where you can
              create, update, and delete tasks while also interacting with drag
              and drop functionality.
            </p>
          </div>
        </motion.div>

        <NavCards />
      </section>
      {/* Footer for the main dashboard. Needed here for conditional rendering */}
      <Footer />
    </>
  );
};

export default Dashboard;
