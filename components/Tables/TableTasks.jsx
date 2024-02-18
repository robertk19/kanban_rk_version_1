"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const TableTasks = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const bearerToken = sessionStorage.getItem("token");
  let userId = null;

  const words = ["Your", "Tasks!"]; // For funny animation thingo

  useEffect(() => {
    refreshTasks();
  }, []);

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

  const refreshTasks = async () => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const response = await axios.get(
      `http://localhost:8088/kanban_board/tasks/user/${userId}`,
      requestOptions
    );
    setTasks(response.data);
  };

  const deleteTask = async (taskId) => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    await axios.delete(
      "http://localhost:8088/kanban_board/tasks/" + taskId,
      requestOptions
    );
    refreshTasks();
  };

  return (
    <>
      <motion.div className="box p-4 py-16 text-center">
        <h1 className="head-text">
          <span className="blue-gradient_text font-semibold drop-shadow">
            <AnimatePresence>
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.2 }} // Increase the delay for each word
                >
                  {word}{" "}
                </motion.span>
              ))}
            </AnimatePresence>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }} // Delay the appearance of the Divider
        >
          <Divider
            style={{
              margin: "30px 400px 0px",
              height: "4px", // Make it thicker so its actuall visible
              backgroundImage: "linear-gradient(to right, lightblue, violet)", // Add a gradient :)
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }} // Delay the appearance of the table
      >
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-graydark uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Task Lane
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr class=" bg-light-white border-b">
                <td class="px-6 py-4">{task.title}</td>
                <td class="px-6 py-4">{task.description}</td>
                <td class="px-6 py-4">{task.lane}</td>
                <td class="px-6 py-4 ">
                  <a
                    href="#"
                    class="font-medium text-purple-500 *:hover:underline mr-4"
                    onClick={() => deleteTask(task.task_id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </>
  );
};

export default TableTasks;
