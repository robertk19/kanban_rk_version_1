"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const bearerToken = sessionStorage.getItem("token");

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = async () => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const response = await axios.get(
      "http://localhost:8088/kanban_board/users",
      requestOptions
    );
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    console.log(userId);
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    await axios.delete(
      "http://localhost:8088/kanban_board/users/" + userId,
      requestOptions
    );
    refreshUsers();
  };

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              User ID
            </th>
            <th scope="col" class="px-6 py-3">
              User Email
            </th>
            <th scope="col" class="px-6 py-3">
              User Name
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.user_id}
              </th>
              <td class="px-6 py-4">{user.email}</td>
              <td class="px-6 py-4">{user.username}</td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => deleteUser(user.user_id)}
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
