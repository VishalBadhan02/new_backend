const mongoose = require("mongoose")

const CampusAmbassadorSchema = mongoose.Schema({
    name: String,
    email: String,
    phone1: String,
    phone_secondary: String,
    college: String,
    state: String,
    degree: String,
    year: String,
}, { timestamps: true })

const CampusAmbassadorModel = mongoose.model("c_a_list", CampusAmbassadorSchema)

module.exports = { CampusAmbassadorModel }