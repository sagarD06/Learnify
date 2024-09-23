import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {userRouter} from "./routes/userRoutes.js";
import {courseRouter} from "./routes/courseRoutes.js";
import {adminRouter} from "./routes/adminRoutes.js";

const app = express();
app.use(express.json());
const port = 3000;

/** USERS ROUTES */
app.use("/api/v1/user", userRouter);

/** COURSE ROUTES */
app.use("/api/v1/courses", courseRouter);

/** ADMIN ROUTES */
app.use("/api/v1/admin", adminRouter);

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
