const mongoose = require("mongoose")

const CoursesSchema = mongoose.Schema({
    Computer_Science: Array,
    Electrical_and_Electronics_Engineering: Array,
    Mechanical_and_Automobiles: Array,
    Management: Array,
    Biotechnology: Array,
    Civil_Engineering: Array,
}, { timestamps: true })

const CoursesModel = mongoose.model("courses", CoursesSchema)

module.exports = { CoursesModel }