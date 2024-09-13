const mongoose = require("mongoose")

const CampusAmbassadorRegistrationSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    conformPassword: String,
    status: String
}, { timestamps: true })

const CampusAmbassadorRegistrationModel = mongoose.model("campusambassadorregistrations", CampusAmbassadorRegistrationSchema)

module.exports = { CampusAmbassadorRegistrationModel }