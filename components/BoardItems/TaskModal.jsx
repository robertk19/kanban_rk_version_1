import React, { useState } from "react";
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
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const TaskModal = ({
  isModalOpen,
  setIsModalOpen,
  fetchTasks,
  bearerToken,
  userId,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lane, setLane] = useState(1);
  const [priority, setPriority] = useState(0);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newTask = {
      title,
      description,
      lane,
      priority,
      user: {
        user_id: userId,
      },
    };

    try {
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

      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error("Error creating new task: ", error);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      fullWidth={true}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.35,
          delay: 0.15,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <h1 className="px-6 pt-8 pb-0 text-2xl font-bold">
          Create a{" "}
          <span className="blue-gradient_text font-semibold drop-shadow">
            New Task!
          </span>
        </h1>
        <Divider
          style={{
            margin: "10px 0px 0px 18px",
            height: "4px",
            width: "40%",
            backgroundImage: "linear-gradient(to right, lightblue, violet)",
          }}
        />
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline // Add this
              rows={4} // And this
            />
            <div className="py-3"></div>
            <InputLabel id="lane-label">Lane</InputLabel>
            <Select
              labelId="lane-label"
              value={lane}
              onChange={(e) => setLane(e.target.value)}
              fullWidth
              defaultValue={1}
              style={{ width: "60%" }}
            >
              <MenuItem value={1}>To Do</MenuItem>
              <MenuItem value={2}>Doing</MenuItem>
              <MenuItem value={3}>Done</MenuItem>
            </Select>
            <div className="py-3"></div>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              fullWidth
              defaultValue={0}
              style={{ width: "50%" }}
            >
              <MenuItem value={0}>Low</MenuItem>
              <MenuItem value={1}>High</MenuItem>
              <MenuItem value={2}>Completed</MenuItem>
            </Select>
            <div className="py-3"></div>
            {/* Add more input fields as necessary */}
            <DialogActions>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
};

export default TaskModal;
