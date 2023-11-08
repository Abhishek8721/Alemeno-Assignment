const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema(
    
    {
        name: {
            type: String,
            required: true
        },
        instructor: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        prerequisites: {
            type: [String],
            required: true
        },
        syllabus: [
            {
                week: {type: String},
                topic: {type: String},
                content: {type: String}
            }
           
        ],
        srudents:{
            type: [String],
            default:[]
        },
       
    })
    module.exports = mongoose.model("Course",CourseSchema)
