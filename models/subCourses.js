const mongoose = require("mongoose")

const SubCoursesSchema = mongoose.Schema({
    name: String
}, { timestamps: true })

const SubCoursesModel = mongoose.model("subcourses", SubCoursesSchema)

module.exports = { SubCoursesModel }