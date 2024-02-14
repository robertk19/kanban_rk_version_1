"use client";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Divider,
} from "@mui/material"; // For modal stuff :)
import React, { useEffect, useState } from "react";

import Image from "next/image";
import BoardData from "../data/board.json";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from "@/utils/StrictModeDroppable"; // Custom util made to ensure that strictmode does not interfere with draggable functionality
import CardItem from "@/components/BoardItems/CardItem";
import { motion } from "framer-motion";
import TaskModal from "./BoardItems/TaskModal";
import Link from "next/link";
// import Addsquare1 from "/addsquare1.svg";

const KanbanBoard = () => {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const bearerToken = sessionStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = sessionStorage.getItem("userid");

  // The const needed in order to submit a new task from this screen
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lane, setLane] = useState(1);
  const [priority, setPriority] = useState(0);

  const laneNames = ["To Do", "Doing", "Done"]; // Add more names as needed

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);

  // Fetching all the data from the Rest API of our application
  useEffect(() => {
    fetchTasks();
  }, []);

  // Check if user is logged in by if the bearer token is empty or not.
  useEffect(() => {
    if (!bearerToken) {
      router.push("/login"); // Go to login page if user is not logged in (bearer token empty)
    } else {
      console.log(bearerToken);
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      };
      const response = await axios.get(
        `http://localhost:8088/kanban_board/tasks/user/${userId}`,
        requestOptions
      );
      console.log(response.data);
      const transformedData = transformData(response.data);
      setBoardData(transformedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const transformData = (apiData) => {
    // Initialize transformedData with empty lanes in the correct order
    const transformedData = laneNames.map((laneName) => ({
      name: laneName,
      items: [],
    }));

    // Populate lanes with tasks from apiData
    apiData.forEach((task) => {
      const laneName = laneNames[task.lane - 1]; // Assuming task.lane is 1-indexed
      const laneIndex = transformedData.findIndex(
        (board) => board.name === laneName
      );
      if (laneIndex !== -1) {
        transformedData[laneIndex].items.push({
          id: task.task_id,
          title: task.title,
          desc: task.description,
          priority: task.priority, // Include the priority field
        });
      }
    });

    return transformedData;
  };

  const onDragEnd = async (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    console.log(newBoardData);
    setBoardData(newBoardData);

    // Update the task lane in the database
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const updatedTask = {
      task_id: dragItem.id,
      title: dragItem.title,
      description: dragItem.desc,
      lane: parseInt(re.destination.droppableId) + 1, // Lanes are 1-indexed
      priority: dragItem.priority, // Include the priority field
      user: {
        user_id: 1, // Assuming dragItem has a user_id property
      },
    };

    console.log(updatedTask);

    try {
      await axios.put(
        `http://localhost:8088/kanban_board/tasks`,
        updatedTask,
        requestOptions
      );
    } catch (error) {
      console.error("Error updating task lane: ", error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Get form data

    // Add more fields as necessary

    // Create new task
    const newTask = {
      title,
      description,
      lane, // Set the lane. You might want to replace this with a dynamic value.
      priority,
      user: {
        user_id: userId, // Grabs from userId in the session
      },
    };

    try {
      // Send a POST request to the API endpoint
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        "http://localhost:8088/kanban_board/tasks",
        newTask,
        requestOptions
      );

      // Close the modal
      setIsModalOpen(false);

      // Refresh the tasks in the board
      // This depends on how you're fetching the tasks. If you're using a function like fetchTasks, you can call it here.
      fetchTasks();
    } catch (error) {
      console.error("Error creating new task: ", error);
    }
  };

  return (
    <>
      <motion.div
        className="box p-4 py-16 text-center" // Add these classes
        initial={{ x: "-100%" }} // start from the left
        animate={{ x: 0 }} // animate to its original position
        transition={{ type: "spring", stiffness: 60, damping: 20 }} // adjust transition as needed
      >
        <h1 className="head-text">
          Welcome back to your{" "}
          <span className="blue-gradient_text font-semibold drop-shadow">
            Kanban Board!
          </span>
        </h1>
        <Divider
          style={{
            margin: "30px 200px 0px",
            height: "4px", // Make it thicker so its actuall visible
            backgroundImage: "linear-gradient(to right, lightblue, violet)", // Add a gradient :)
          }}
        />
      </motion.div>

      <motion.div
        className="p-5 flex flex-col lg:h-[115vh]  bg-white"
        initial={{ x: "100%" }} // start from the left
        animate={{ x: 0 }} // animate to its original position
        transition={{ type: "spring", stiffness: 60, damping: 20 }} // adjust transition as needed
      >
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-5 my-8 ">
              {boardData.map((board, bIndex) => (
                <div key={board.name}>
                  <StrictModeDroppable droppableId={bIndex.toString()}>
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div
                          className={`bg-[#F5F5F5] rounded-t-lg shadow-md h-[108vh]
                        flex flex-col relative overflow-hidden pb-3 px-2 
                        ${snapshot.isDraggingOver && "bg-green-100"}`}
                        >
                          <div className=" px-3 mt-5 flex gap-2 items-center justify-between">
                            <span className="flex gap-2 items-center">
                              <p
                                className={`${
                                  board.name === "To Do"
                                    ? "bg-[#5030E5]"
                                    : board.name === "Doing"
                                    ? "bg-[#b700ff]"
                                    : board.name === "Done"
                                    ? "bg-[#8bc48a]"
                                    : "bg-[#8bc48a]"
                                } rounded-full w-[8px] h-[8px]`}
                              ></p>
                              <span className="font-medium text-base leading-5 text-indigo-900">
                                {board.name}
                              </span>
                              <span className="bg-[#E0E0E0] text-center text-[#625F6D] rounded-full h-[20px] w-[20px] font-medium	text-[12px]">
                                {board.items.length}
                              </span>
                            </span>

                            {board.name === "To Do" ? (
                              <button onClick={() => setIsModalOpen(true)}>
                                <Image
                                  className="hover:brightness-75"
                                  src="/addsquare1.svg"
                                  alt="attach"
                                  width={20}
                                  height={20}
                                />
                              </button>
                            ) : null}

                            {/* {board.name === "To Do" ? (   // Old way of doing this, opens create-task dialog
                            <Link href="/create-task">
                              <Image
                                className="hover:brightness-75"
                                src="/addsquare1.svg"
                                alt="attach"
                                width={20}    
                                height={20}
                              />
                            </Link>
                          ) : null} */}
                          </div>
                          <p
                            className={`${
                              board.name === "To Do"
                                ? "bg-[#5030E5]"
                                : board.name === "Doing"
                                ? "bg-[#b700ff]"
                                : board.name === "Done"
                                ? "bg-[#8bc48a]"
                                : "bg-[#c48a8a]"
                            } w-100 h-[3px] my-5`}
                          ></p>
                          <div
                            className="mt-1 overflow-y-auto overflow-x-hidden h-auto"
                            style={{ maxHeight: "calc(100vh - 50px)" }}
                          >
                            {board.items.length > 0 &&
                              board.items.map((item, iIndex) => (
                                <CardItem
                                  key={item.id}
                                  data={item}
                                  index={iIndex}
                                  className="m-3"
                                  priority={item.priority} // Pass the priority field
                                />
                              ))}
                            {provided.placeholder}
                          </div>
                        </div>
                      </div>
                    )}
                  </StrictModeDroppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        )}
      </motion.div>

      <TaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        fetchTasks={fetchTasks}
        bearerToken={bearerToken}
        userId={userId}
      />
    </>
  );
};

export default KanbanBoard;
