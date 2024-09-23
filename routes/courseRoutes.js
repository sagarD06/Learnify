import express from "express";

const courseRouter = express.Router();

courseRouter.get("/", function (req, res) {
    res.json({
        message : "Course"
    })
});
courseRouter.post("/purchase", function (req, res) {
    res.json({
        message : "Course"
    })
});

export {courseRouter};
