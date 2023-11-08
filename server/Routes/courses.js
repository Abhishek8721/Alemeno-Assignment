const express = require('express')
const mongoose = require("mongoose")
const User = require('../Models/User')
const Course = require('../Models/Course')
const verifyToken = require("../verifyToken")
const app = express()
app.post("/addcourse", async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.json({ result: true, msg: "Course has been created!" })
    } catch (error) {
        res.send(error)
    }

})
app.get("/getcourse", verifyToken, async (req, res) => {
    try {
        const Courses = await Course.find();

        res.json({ result: true, data: Courses })
    } catch (error) {
        res.send(error)
    }

})
app.get("/singlecourse", verifyToken, async (req, res) => {
    try {

        const course = await Course.findById(req.query.id);

        res.json({ result: true, data: course })
    } catch (error) {
        res.send(error)
    }

})
app.post("/addstudent", verifyToken, async (req, res) => {
    try {
        console.log(req.body, "addstudent");
        const userId = req.user.id
        console.log(userId);
        const course = await Course.findByIdAndUpdate(req.body.id, {
            $addToSet: { srudents: userId }
        }, { new: true });
        console.log(course);
        res.json("added succesfully")
    } catch (error) {
        res.send(error)
    }

})
app.get("/getstudent", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        const course = await Course.find({ srudents: req.user.id })
        res.json({ user: user, course: course })
    } catch (error) {
        res.json(error)
    }


})
app.post("/search", verifyToken, async (req, res) => {
    try {
        console.log(req.body);
    const course = await Course.find({name: new RegExp(req.body.name,'i')})
        res.json(course)
    } catch (error) {
        res.json(error)
    }


})
module.exports = app