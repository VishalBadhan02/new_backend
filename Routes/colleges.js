const express = require('express')
const route = express.Router();
const CollegeControl = require("../Controller/collegeController")


route.get("/setCollege/:code", CollegeControl.setCollege)
route.get("/getcountry", CollegeControl.getcountry);
route.get("/getstate/:country", CollegeControl.getstate);
route.get("/getcity/:state", CollegeControl.getcity);
route.get("/setCollegedata/:id", CollegeControl.setCollegeData);
route.get("/getDomain", CollegeControl.setCourses);
route.get("/getSubCourses/:value", CollegeControl.setSubCourses);
route.get("/checkPhone/:value", CollegeControl.checkPhone);


route.post("/getTPO", CollegeControl.getTPO);
route.post("/fromSubmission", CollegeControl.formSubmission);

module.exports = route;