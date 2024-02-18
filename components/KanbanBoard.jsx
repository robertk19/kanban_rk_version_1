"use client";
import axios from "axios";
import { Divider, Snackbar, Alert } from "@mui/material"; // For modal stuff :)
import React, { useEffect, useState } from "react";

import Image from "next/image";
import BoardData from "../data/board.json";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from "@/utils/StrictModeDroppable"; // Custom util made to ensure that strictmode does not interfere with draggable functionality
import CardItem from "@/components/BoardItems/CardItem";
import { motion } from "framer-motion";
import TaskModal from "./BoardItems/TaskModal";
import { useRouter } from "next/navigation";

const KanbanBoard = () => {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // The const needed in order to submit a new task from this screen
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lane, setLane] = useState(1);
  const [priority, setPriority] = useState(0);

  let bearerToken = sessionStorage.getItem("token"); // Token and username are set twice. Inefficient however
  let userId = sessionStorage.getItem("userid"); // Ran out of time trying to have it only be set once. Both happen at different stages of page loading

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);

  const laneNames = ["To Do", "Doing", "Done"]; // Reference names for the lanes to render them out correctly

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    bearerToken = sessionStorage.getItem("token");
    userId = sessionStorage.getItem("userid");

    if (!bearerToken) {
      router.push("/login"); // Go to login page if user is not logged in (bearer token empty)
    } else if (bearerToken && userId) {
      fetchTasks(bearerToken, userId);
    }
  }, []);

  const fetchTasks = async (bearerToken, userId) => {
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
          lane: task.lane, // Include the lane field
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
        user_id: userId, // DragItem has a user_id property
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

  return (
    <>
      <motion.div
        className="box p-4 py-16 text-center"
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
                                  lane={item.lane} // Pass the lane field
                                  bearerToken={bearerToken} // Pass the bearerToken
                                  fetchTasks={fetchTasks} // Pass the fetchTasks function
                                  userId={userId} // Pass the userId
                                  setOpenSuccessSnackbar={
                                    setOpenSuccessSnackbar
                                  } // Pass setOpenSnackbar as a prop
                                  setOpenDeleteSnackbar={setOpenDeleteSnackbar} // Pass setOpenSnackbar as a prop
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

      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSuccessSnackbar(false)}
          severity="success"
          sx={{ fontSize: "1.2em" }}
        >
          Task Sucessfully Updated!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openDeleteSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenDeleteSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenDeleteSnackbar(false)}
          severity="error"
          sx={{ fontSize: "1.2em" }}
        >
          Task Successfully Deleted!
        </Alert>
      </Snackbar>
    </>
  );
};

export default KanbanBoard;
