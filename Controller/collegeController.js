const { CollegeModel } = require("../models/college")
const { CountryModel } = require("../models/country")
const { StateModel } = require("../models/state")
const { CityModel } = require("../models/city")
const selenium = require("../helpers/selenium")
const { KarnatakaModel } = require("../models/karnataka")
const { CoursesModel } = require("../models/courses")
const { SubCoursesModel } = require("../models/subCourses")
const { UserModel } = require("../models/registration")
const reply = require("../helpers/reply")
const PhoneNumberCheck = require("../helpers/phoneNumberCheck")

const setCollege = async (req, res) => {
    try {
        const data = await CollegeModel.find({ state: req.params.code });
        const city = await CollegeModel.find({ district: req.params.code });
        // const karnataka = await KarnatakaModel.find();
        // return res.json(karnataka)
        if (city.length > 0) {
            return res.json(city)
        }
        if (data.length > 0) {
            return res.json(data)
        }

    } catch (error) {
        return res.json(error);
    }
}

const getcountry = async (req, res) => {
    try {
        const country = await CountryModel.find();
        return res.json(country)
    } catch (err) {
        res.send(err.message)
    }
}

const getstate = async (req, res) => {
    try {
        const state = await StateModel.find({ country_name: req.params.country });
        return res.json(state)
    } catch (err) {
        res.send(err.message)
    }
}

const getcity = async (req, res) => {
    try {
        const city = await CityModel.find({
            state_name: req.params.state
        });
        return res.json(city)
    } catch (err) {
        res.send(err.message)
    }
}

const getTPO = async (req, res) => {
    try {
        const url = req.body.value;
        const emails = await selenium.scrapeEmails(url);
        return res.json({ emails });
    } catch (error) {
        return res.status(500).json({ message: 'Error in getting TPO', error });
    }
};

const setCollegeData = async (req, res) => {
    try {
        const data = await CollegeModel.findOne({ _id: req.params.id })
        const kdata = await KarnatakaModel.findOne({ _id: req.params.id })
        return res.json(kdata)
    } catch (error) {
        return res.json("error in setCollegeData", error)
    }
}

const setCourses = async (req, res) => {
    try {
        const data = await CoursesModel.find()
        return res.json(data)
    } catch (error) {
        return res.json("error in setCourses")
    }
}
const setSubCourses = async (req, res) => {
    try {
        const data = await SubCoursesModel.find({
            course_id: req.params.value
        })
        return res.json(data)
    } catch (error) {
        return res.json("error in setCourses")
    }
}

const checkPhone = async (req, res) => {
    try {
        const isPhoneNumberAvailable = await PhoneNumberCheck.PhoneNumberCheck(req.params.value);
        if (!isPhoneNumberAvailable) {
            return res.json(reply.failure("Phone number alreay exist"));
        }
        else {
            return res.json(reply.success("phone no not matchs"))
        }
    } catch (error) {
        return res.status(500).json("error in checkPhone", error.message)
    }
}

const formSubmission = async (req, res) => {
    try {
        const {
            userName,
            email,
            phoneNumber,
            SelectedCourse,
            collegeUniName,
            domain,
            resumeSelect,
            selectedCity,
            selectedCountry,
            selectedState,
        } = req.body

        const data = new UserModel({
            userName,
            email,
            phoneNumber,
            SelectedCourse,
            collegeUniName,
            domain,
            resumeSelect,
            selectedCity,
            selectedCountry,
            selectedState,

        })
        await data.save()
        return res.status(200).json(reply.success("Registration done succesfully!"))


    } catch (error) {
        return res.status(500).json(reply.failure("Error in saving response", error.message));
    }


}

module.exports = {
    setCollege, getcity, getstate, getcountry, getTPO, setCollegeData, setCourses, setSubCourses, formSubmission, checkPhone
}