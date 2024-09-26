import express from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Admin, Course } from "../db";
import "dotenv/config";

const adminRouter = express.Router();

/** SIGN UP ENDPOINT **/
adminRouter.post("/sign-up", async function (req, res) {
  const validatedReq = z.object({
    firstName: z
      .string()
      .min(3, { message: "Minimum 3 charaters expected" })
      .max(15, { message: "Maximum 15 charaters allowed" }),
    lastName: z
      .string()
      .min(1, { message: "Minimum 1 charaters expected" })
      .max(15, { message: "Maximum 15 charaters allowed" }),
    email: z
      .string()
      .email()
      .min(5, { message: "Minimum 5 charaters expected" })
      .max(30, { message: "Maximum 30 charaters allowed" }),
    password: z.string().min(8, { message: "Minimum 8 charaters expected" }),
  });
  const parsedreq = validatedReq.safeParse(req.body);
  const { firstName, lastName, email, password } = parsedreq.data;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const response = await Admin.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });
    return res.status(200).json({
      message: "You have been signed up",
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong while signing up",
      success: false,
    });
  }
});

/** SIGN IN ENDPOINT **/
adminRouter.post("/sign-in", async function (req, res) {
  const validatedReq = z.object({
    identifier: z
      .string()
      .min(3, { message: "Minimum 3 charaters expected" })
      .max(30, { message: "Maximum 30 charaters allowed" }),
    password: z.string().min(8, { message: "Minimum 8 charaters expected" }),
  });
  const parsedreq = validatedReq.safeParse(req.body);
  const { identifier, password } = parsedreq.data;
  try {
    const user = await Admin.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const ispasswordCorrect = await bcrypt.compare(user.password, password);
    if (!ispasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const token = jwt.sign(user._id, process.env.JWT_SECRET);

    if (!token) {
      return res
        .status(500)
        .json({ message: "Token not generated", success: false });
    }

    return res.status(200).json({
      message: "You have been signed in",
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "You have been signed in",
    });
  }
});

/** CREATE COURSE ENDPOINT **/
adminRouter.get("/create-course", async function (req, res) {
  const validatedReq = z.object({
    title: z.string().min(3, { message: "Minimum 3 charaters expected" }),
    description: z
      .string()
      .min(10, { message: "Minimum 10 charaters expected" }),
    price: z.number().min(0, { message: "Price cannot be negative" }),
    imageUrl: z.string().min(0, { message: "Duration cannot be negative" }),
    creatorId: z.string(),
  });
  const parsedreq = validatedReq.safeParse(req.body);
  const { title, description, price, imageUrl, creatorId } = parsedreq.data;

  try {
    // Findin if the course already exist
    const existingCourse = await Course.find({ title: title });
    if (existingCourse) {
      return res.status(400).json({
        message: "Course already exist!",
        success: false,
      });
    }
    const response = await Course.create({
      title,
      description,
      price,
      imageUrl,
      creatorId,
    });
    return res.json({
      message: "You have created a new course",
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong while creating course",
    });
  }
});

/** ADD CONTENT ENDPOINT **/
adminRouter.put("/add-course-content", function (req, res) {
  res.json({
    message: "You have added content to the cpurse successfully",
  });
});

/** DELETE ENDPOINT **/
adminRouter.delete("/delete-course", function (req, res) {
  res.json({
    message: "You have deleted the course",
  });
});

export { adminRouter };
