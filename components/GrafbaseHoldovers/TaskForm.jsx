"use client";

import { useState } from "react";
import Image from "next/image";
import FormField from "./FormField";
import { laneFilters, priorityFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./OldButton";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProjectForm = ({ type, session, project }) => {
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "create") {
        await createNewProject(form, token);

        router.push("/board");
      }

      if (type === "edit") {
        await updateProject(form, project?.id, token);

        router.push("/board");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const createNewProject = async (form, creatorId, token) => {
    // Prepare the data for the new task
    const taskData = {
      title: form.title,
      description: form.description,
      lane: 1, // Set the lane. You might want to replace this with a dynamic value.
      priority: 2, // Set the priority. You might want to replace this with a dynamic value.
      user: {
        user_id: 1,
      },
    };

    // Send a POST request to the API endpoint
    return axios.post("http://localhost:8088/kanban_board/tasks", taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  const updateProject = () => {
    return null;
  };

  const handleStateChange = (fieldname, value) => {
    setform((prevState) => ({ ...prevState, [fieldname]: value }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [form, setform] = useState({
    title: project?.title || "",
    description: project?.description || "",
    lane: 1, // Initialize the lane field
    priority: 2, // Initialize the priority field
  });

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">Where the image was</div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Robert Jack Knieriemen Showcase"
        setState={(value) => handleStateChange("title", value)}
      />

      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover the various projects that I have and am working on!"
        setState={(value) => handleStateChange("description", value)}
      />

      <CustomMenu
        title="Lane"
        state={form.lane}
        filters={laneFilters}
        setState={(value) => handleStateChange("lane", value)}
      />
      <CustomMenu
        title="priority"
        state={form.priority}
        filters={priorityFilters}
        setState={(value) => handleStateChange("priority", value)}
      />

      <div className="flexStart w-full ">
        <Button
          title={
            submitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={submitting ? "" : "/plus.svg"}
          submitting={submitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
