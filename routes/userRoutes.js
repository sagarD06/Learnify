import express from "express";

const userRouter = express.Router();

userRouter.post("/sign-up", function (req, res) {
    res.json({
        message: "Signed up successfully"
    })
});
userRouter.post("/sign-in", function (req, res) {
    res.json({
        message: "Signed in successfully"
    })
});
userRouter.get("/courses", function (req, res) {
    res.json({
        message: "Courses fetched successfully"
    })
});

export {userRouter};