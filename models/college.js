const { mongoose } = require("mongoose");

const CollegeSchema = mongoose.Schema({
    university: String,
    college: String,
    college_type: String,
    state: String,
    district: String,
    collegeNames: Array

}, { timestamps: true })

const CollegeModel = mongoose.model("colleges", CollegeSchema);

module.exports = { CollegeModel };