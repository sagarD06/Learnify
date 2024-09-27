import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User, Course } from "../db.js";
import userAuth from "./middleware/userMiddleware.js";

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
    identifier: z
      .string()
      .min(3, { message: "Minimum 3 charaters expected" })
      .max(30, { message: "Maximum 30 charaters allowed" }),
    password: z.string().min(8, { message: "Minimum 8 charaters expected" }),
  });
  const parsedreq = validatedReq.safeParse(req.body);
  const { identifier, password } = parsedreq.data;
  try {
    const user = await User.findOne({
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
      message: "You have been signed in",
    });
  }
});
userRouter.get("/courses", userAuth, async function (req, res) {
  try {
    res.json({
      message: "Courses fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to fetch courses",
      success: false,
    });
  }
});

export { userRouter };
