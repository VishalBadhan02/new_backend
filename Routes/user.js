const express = require("express")
const route = express.Router();
const UserControll = require("../Controller/userController")

route.get("/getCALeads", UserControll.getCALeads)
route.get("/SendMail/:id", UserControll.sendMail)
route.get("/getCA/:id", UserControll.getCADetails)



route.post("/registerCA", UserControll.setCARegistration)

module.exports = route