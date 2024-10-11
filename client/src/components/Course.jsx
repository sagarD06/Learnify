"use client";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TextArea } from "./ui/TextArea";
import { AuthContext } from "../context/AuthContext";

const Course = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const { id } = useParams();

  async function getCourse() {
    const response = await axios.get(
      `http://localhost:3000/api/v1/courses/${id}`
    );
    if (response.data.success) {
      setTitle(response.data.courses.title);
      setDescription(response.data.courses.description);
      setPrice(response.data.courses.price);
      setImageUrl(response.data.courses.imageUrl);
      return true;
    }
  }

  if (id) {
    useEffect(() => {
      getCourse();
    }, []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id) {
        const response = await axios.put(
          `http://localhost:3000/api/v1/admin/add-course-content/${id}`,
          {
            title,
            description,
            price: parseFloat(price),
            imageUrl,
            creatorId: user,
          },
          { headers: { token: user } }
        );

        if (response.data.success) {
          navigate("/admin/dashboard");
        }
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/admin/create-course",
          {
            title,
            description,
            price: parseFloat(price),
            imageUrl,
            creatorId: user,
          },
          { headers: { token: user } }
        );

        if (response.data.success) {
          navigate("/admin/dashboard");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col">
      <div>
        <h2 className="text-center text-3xl text-neutral-300">
          {id ? "Update Course" : "Create New Course"}
        </h2>
      </div>
      <form className="dark my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 w-full mb-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            placeholder="React Course"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col space-y-2 w-full mb-4">
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            value={description}
            rows={2}
            cols={50}
            spellCheck={true}
            placeholder="Enter course description..."
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="border-neutral-400 text-neutral-300 rounded-lg p-4 bg-zinc-800"
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <div className="flex flex-col space-y-2 w-full mb-4">
            <Label htmlFor="price">Price (in rupees)</Label>
            <Input
              id="price"
              value={price}
              type="number"
              onChange={(e) => {
                setPrice(parseInt(e.target.value));
              }}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full mb-4">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              placeholder="Cover image url"
              type="text"
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
          </div>
        </div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {id ? "Update Course" : "Create Course"} &rarr;
        </button>
      </form>
    </div>
  );
};

export default Course;
