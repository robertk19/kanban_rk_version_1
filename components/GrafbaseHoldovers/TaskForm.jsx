"use client";

import { useState } from "react";
import Image from "next/image";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
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
        await createNewProject(form, session?.user?.id, token);

        router.push("/");
      }

      if (type === "edit") {
        await updateProject(form, project?.id, token);

        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const createNewProject = async (form, creatorId, token) => {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      const variables = {
        input: {
          ...form,
          image: imageUrl.url,
          createdBy: {
            link: creatorId,
          },
        },
      };

      return axios({
        url: "YOUR_GRAPHQL_ENDPOINT",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          query: createProjectMutation,
          variables: variables,
        },
      });
    }
  };

  const updateProject = () => {
    return null;
  };

  const handleChangeImage = (e) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please upload an image file");

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldname, value) => {
    setform((prevState) => ({ ...prevState, [fieldname]: value }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [form, setform] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project Poster"
            fill
          />
        )}
      </div>

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

      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="http://localhost:3000"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/robertk19"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
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
