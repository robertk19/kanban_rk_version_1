import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  InputLabel,
  Select,
  Divider,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

function CardItem({
  data,
  index,
  bearerToken,
  fetchTasks,
  userId,
  setOpenSuccessSnackbar,
  setOpenDeleteSnackbar,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.desc);
  const [lane, setLane] = useState(data.lane);
  const [priority, setPriority] = useState(data.priority);

  const task_id = data.id; // Need for updating, requires a task ID for some reason

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditOpen = () => {
    setIsEditOpen(true);
    handleClose();
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const updatedTask = {
      task_id: data.id,
      title,
      description,
      lane,
      priority,
      user: {
        user_id: userId,
      },
    };

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    await axios
      .put(
        "http://localhost:8088/kanban_board/tasks",
        updatedTask,
        requestOptions
      )
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });

    setOpenSuccessSnackbar(true); // Show the success message
    fetchTasks(bearerToken, userId);
    handleEditClose();
  };

  const deleteTask = async () => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    await axios.delete(
      "http://localhost:8088/kanban_board/tasks/" + data.id,
      requestOptions
    );
    setOpenDeleteSnackbar(true); // Show the success message
    fetchTasks(bearerToken, userId);
  };

  return (
    <>
      <Draggable index={index} draggableId={data.id.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white rounded-md p-3  m-3 mt-0 last:mb-0"
          >
            <div className="flex justify-between items-center">
              <label
                className={`px-2 py-1 rounded-[4px] text-[12px] font-medium	 bg-opacity-20		
              ${
                data.priority === 0
                  ? "bg-[#74afdf] text-[#4996d5]"
                  : data.priority === 1
                  ? "bg-[#D8727D] text-[#D8727D]"
                  : "bg-[#83C29D] text-[#68B266]"
              }
              `}
              >
                {data.priority === 0
                  ? "Low"
                  : data.priority === 1
                  ? "High"
                  : "Completed"}
              </label>
              <BsThreeDots onClick={handleClick} />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: "120px",
                    height: "90px",
                  },
                }}
              >
                <MenuItem onClick={handleEditOpen}>Edit Task</MenuItem>
                <MenuItem onClick={deleteTask}>Delete</MenuItem>{" "}
              </Menu>
              <Dialog
                open={isEditOpen}
                onClose={handleEditClose}
                fullWidth={true}
              >
                <h1 className="px-6 pt-8 pb-0 text-2xl font-bold">
                  Edit an{" "}
                  <span className="blue-gradient_text font-semibold drop-shadow">
                    Existing Task!
                  </span>
                </h1>
                <Divider
                  style={{
                    margin: "10px 0px 0px 18px",
                    height: "4px",
                    width: "40%",
                    backgroundImage:
                      "linear-gradient(to right, lightblue, violet)",
                  }}
                />
                <DialogContent>
                  <form onSubmit={handleEditSubmit}>
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
                      multiline
                      rows={4}
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
                    <DialogActions>
                      <Button onClick={handleEditClose}>Cancel</Button>
                      <Button type="submit">Submit</Button>
                    </DialogActions>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <h5 className="font-semibold	text-[18px] leading-6 text-[#0D062D] my-3">
              {data?.title}
            </h5>
            <p className="text-[#787486] font-normal	text-[12px] mb-5">
              {data?.desc}
            </p>
            {data?.img && (
              <img
                src={data?.img}
                alt={data?.img}
                className="my-3 h-full w-full"
              />
            )}
            <div>
              <ul className="flex space-x-3 justify-between">
                <li>
                  <div className="-space-x-2">
                    <Image
                      className="relative z-30 inline object-cover w-[24px] h-[24px] border-2 border-white rounded-full"
                      src="/profile.png"
                      alt="Profileimage"
                      width={24}
                      height={24}
                    />
                  </div>
                </li>
                <li className="flex items-center gap-1 font-medium text-[#787486]	text-[12px]">
                  <Image src="/message.svg" width={15} height={15} alt="home" />
                  <span>{data.comments}</span>
                  Comments
                </li>
                <li className="flex items-center gap-1 font-medium text-[#787486]	text-[12px]">
                  <Image src="/files.svg" width={15} height={15} alt="home" />
                  {/* <span>{data.checklists}</span> */}
                  Checklist
                </li>
              </ul>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default CardItem;
