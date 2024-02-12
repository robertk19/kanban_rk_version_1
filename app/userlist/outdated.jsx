"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

const Tasklist = () => {
  const [users, setUsers] = useState([]);
  const [bearerToken, setBearerToken] = useState(
    sessionStorage.getItem("token")
  );

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
    <>
      <Navbar />
      <h1>Users DELETE THIS LATER</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Email</th>
            <th>User Name</th>
            <th>Edit User</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              {/* <td>{user.favFood}</td>
              <td style={{ backgroundColor: user.favColor }}></td> */}
              <td>
                <button
                  onClick={() => router.push("/createUser/" + user.id)}
                  style={{ backgroundColor: "#dde3ff" }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => deleteUser(user.id)}
                  style={{ backgroundColor: "#ffc7c7" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={{ backgroundColor: "#dcf3e1" }}
        onClick={() => router.push("/createUser")}
      >
        Create new User
      </button>
      <button onClick={refreshUsers}>Refresh</button>
      <Footer />
    </>
  );
};

export default Tasklist;
