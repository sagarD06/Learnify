import express from "express";

const adminRouter = express.Router();

adminRouter.post("/sign-up", function (req, res) {
    res.json({
        message : "You have been signed up"
    })
});
adminRouter.post("/sign-in", function (req, res) {
    res.json({
        message : "You have been signed in"
    })
});
adminRouter.get("/create-course", function (req, res) {
    res.json({
        message : "You have created course successfully"
    })
});
adminRouter.put("/add-course-content", function (req, res) {
    res.json({
        message : "You have added content to the cpurse successfully"
    })
});
adminRouter.delete("/delete-course", function (req, res) {
    res.json({
        message : "You have deleted the course"
    })
});

export {adminRouter};
