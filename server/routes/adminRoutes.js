import express from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Admin, Course } from "../db.js";
import adminAuth from "./middleware/adminMiddleware.js";
import "dotenv/config.js";

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
    email: z
      .string()
      .email()
      .min(5, { message: "Minimum 3 charaters expected" })
      .max(30, { message: "Maximum 30 charaters allowed" }),
    password: z.string().min(8, { message: "Minimum 8 charaters expected" }),
  });
  const parsedreq = validatedReq.safeParse(req.body);
  const { email, password } = parsedreq.data;
  try {
    const user = await Admin.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const ispasswordCorrect = await bcrypt.compare(password, user.password);
    if (!ispasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign(user._id.toString(), process.env.JWT_ADMIN_SECRET);

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
      message: error.message || "Something went wrong while signing in",
    });
  }
});

/** GET COURSE ENDPOINT **/
adminRouter.get("/all-courses", adminAuth, async function (req, res) {
  const creatorId = req.creatorId;

  try {
    const courses = await Course.find({ creatorId: creatorId });
    return res.status(200).json({
      message: "Courses fetched successfully",
      success: true,
      courses: courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong while fetching courses",
      success: false,
    });
  }
});

/** CREATE COURSE ENDPOINT **/
adminRouter.post("/create-course", adminAuth, async function (req, res) {
  const validatedReq = z.object({
    title: z.string().min(3, { message: "Minimum 3 charaters expected" }),
    description: z
      .string()
      .min(10, { message: "Minimum 10 charaters expected" }),
    price: z.number().min(0, { message: "Price cannot be negative" }),
    imageUrl: z.string().min(0, { message: "Duration cannot be negative" }),
  });
  const parsedreq = validatedReq.safeParse(req.body);
  const { title, description, price, imageUrl } = parsedreq.data;
  const creatorId = req.creatorId;
  try {
    // Findin if the course already exist
    const existingCourse = await Course.find({ title: title });
    if (existingCourse.length > 0) {
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
    return res.status(200).json({
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
adminRouter.put(
  "/add-course-content/:courseId",
  adminAuth,
  async function (req, res) {
    const { title, description, price, imageUrl } = req.body;
    const { courseId } = req.params;
    const creatorId = req.creatorId;

    try {
      const courseRequested = await Course.findOne({ _id: courseId });
      if (courseRequested.creatorId.toString() !== creatorId) {
        return res.status(403).json({
          message: "You are not authorized to update this course",
          success: false,
        });
      }
      const updatedCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          title,
          description,
          price,
          imageUrl,
          creatorId,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "You have added content to the cpurse successfully",
        success: true,
        data: updatedCourse,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Something went wrong while updating course",
        success: false,
      });
    }
  }
);

/** DELETE ENDPOINT **/
adminRouter.delete(
  "/delete-course/:courseId",
  adminAuth,
  async function (req, res) {
    const courseId = req.params.courseId;
    try {
      const courseRequested = await Course.findOne({ _id: courseId });
      if (courseRequested.creatorId.toString() !== req.creatorId) {
        return res.status(403).json({
          message: "You are not authorized to delete this course",
          success: false,
        });
      }
      await Course.findByIdAndDelete({ _id: courseId });
      return res.json({
        message: "You have deleted the course",
        success: true,
      });
    } catch (error) {
      return res.json({
        message: error.message || "Something went wrong while deleting course",
        success: false,
      });
    }
  }
);

export { adminRouter };
