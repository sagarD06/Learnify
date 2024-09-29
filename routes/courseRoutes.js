import express from "express";

import { Course, Purchase } from "../db.js";
import userAuth from "./middleware/userMiddleware.js";

const courseRouter = express.Router();

/** GET ALL COURSES **/
courseRouter.get("/", async function (req, res) {
  try {
    const courses = await Course.find({}).select("-creatorId");
    res.status(200).json({
      message: "All courses fetched succesfully",
      success: true,
      courses: courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "something went wrong while fetching courses",
      success: false,
    });
  }
});

/** PURCHASE COURSE **/
courseRouter.post("/purchase/:courseId", userAuth, async function (req, res) {
  const userId = req.userId;
  const courseId = req.params.courseId;

  try {
    await Purchase.create({userId, courseId});
    res.status(200).json({
      message: "Course purchased successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        error.message || "something went wrong while purchasing the course",
      success: false,
    });
  }
});

export { courseRouter };
