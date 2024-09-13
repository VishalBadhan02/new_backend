const { mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    userName: String,
    email: String,
    phoneNumber: String,
    SelectedCourse: String,
    collegeUniName: String,
    domain: String,
    resumeSelect: String,
    selectedCity: String,
    selectedCountry: String,
    selectedState: String,
}, { timestamps: true })

const UserModel = mongoose.model("users", UserSchema);

module.exports = { UserModel };