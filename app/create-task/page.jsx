"use client";
import Modal from "@/components/GrafbaseHoldovers/Modal";
import TaskForm from "@/components/GrafbaseHoldovers/TaskForm";
import { motion } from "framer-motion";

const CreateProject = () => {
  return (
    // <motion.div
    //   className="box"
    //   initial={{ opacity: 0, scale: 0.5 }}
    //   animate={{ opacity: 1, scale: 1 }}
    //   transition={{
    //     duration: 0.8,
    //     delay: 0.15,
    //     ease: [0, 0.71, 0.2, 1.01],
    //   }}
    // >

    <Modal>
      <h3 className="modal-head-text">Create a New Project</h3>

      <TaskForm type="create" />
    </Modal>
  );
};

export default CreateProject;
