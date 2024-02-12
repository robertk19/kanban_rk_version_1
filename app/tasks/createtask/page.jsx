"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreateUser = () => {
  const router = useRouter();
  const taskId = router.query ? router.query.taskId : undefined;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lane, setLane] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (taskId) {
      const bearerToken = sessionStorage.getItem("token");
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      };
      axios
        .get(
          `http://localhost:8088/kanban_board/tasks/${taskId}`,
          requestOptions
        )
        .then((response) => {
          const { title, description, lane } = response.data;
          setTitle(title);
          setDescription(description);
          setLane(lane);
        });
    }
  }, [taskId]);

  const createTask = (e) => {
    e.preventDefault();
    const user = { user_id: 1 }; // replace 4 with the actual user id
    const task = { title, description, lane, user };
    const endpoint = "http://localhost:8088/kanban_board/tasks";
    const bearerToken = sessionStorage.getItem("token");
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    if (!taskId) {
      axios
        .post(endpoint, task, requestOptions)
        .then((response) => router.push("/tasklist"));
    } else {
      axios
        .put(endpoint, { ...task, id: taskId }, requestOptions)
        .then((response) => router.push("/tasklist"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <h1>{!taskId ? "Create new" : "Edit"} Task</h1>
      <form onSubmit={createTask}>
        {taskId && <p>Editing task: {taskId}</p>}
        <div>
          <label htmlFor="title">Title</label>
          <input
            required
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-black bg-gray-200"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            required
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-black bg-gray-200"
          />
        </div>
        <div>
          <label htmlFor="lane">Lane</label>
          <input
            required
            id="lane"
            value={lane}
            onChange={(e) => setLane(e.target.value)}
            className="text-black bg-gray-200"
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateUser;
