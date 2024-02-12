"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const TableTasks = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const bearerToken = sessionStorage.getItem("token");

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const response = await axios.get(
      "http://localhost:8088/kanban_board/tasks",
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Button onClick={() => router.push("/tasks/createtask")}>
        Create new user
      </Button>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Task ID CHANGE LATER
            </th>
            <th scope="col" className="px-6 py-3">
              User ID CHANGE LATER
            </th>
            <th scope="col" className="px-6 py-3">
              User Name CHANGE LATER
            </th>
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
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {task.task_id}
              </th>
              <td class="px-6 py-4">{task.user.user_id}</td>
              <td class="px-6 py-4">{task.user.username}</td>
              <td class="px-6 py-4">{task.title}</td>
              <td class="px-6 py-4">{task.description}</td>
              <td class="px-6 py-4">{task.lane}</td>
              <td class="px-6 py-4 ">
                <a
                  href="#"
                  class="font-medium text-red dark:text-red *:hover:underline mr-4"
                  onClick={() => deleteUser(user.user_id)}
                >
                  Delete
                </a>
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTasks;
