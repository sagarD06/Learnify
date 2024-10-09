import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z from "zod";

import { User, Course, Purchase } from "../db.js";
import userAuth from "./middleware/userMiddleware.js";
import "dotenv/config.js";

const userRouter = express.Router();

/** SIGN UP ENDPOINT **/
userRouter.post("/sign-up", async function (req, res) {
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
    const response = await User.create({
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
userRouter.post("/sign-in", async function (req, res) {
  const validatedReq = z.object({
    email: z
      .string()
      .min(3, { message: "Minimum 3 charaters expected" })
      .max(30, { message: "Maximum 30 charaters allowed" }),
    password: z.string().min(8, { message: "Minimum 8 charaters expected" }),
  });
  const parsedreq = validatedReq.safeParse(req.body);
  const { email, password } = parsedreq.data;
  try {
    const user = await User.findOne({ email: email });

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
    const token = jwt.sign(user._id.toString(), process.env.JWT_USER_SECRET);

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

/** GET PURCHASED ROUTES **/
userRouter.get("/courses", userAuth, async function (req, res) {
  try {
    const courseIds = await Purchase.find({ userId: req.userId }).select([
      "courseId",
    ]);
    const courses = await Course.find({
      _id: { $in: courseIds.map((course) => course.courseId) },
    }).select(["-creatorId", "-price"]);
    return res.json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to fetch courses",
      success: false,
    });
  }
});

export { userRouter };
