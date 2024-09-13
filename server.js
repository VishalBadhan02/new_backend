const http = require("http");
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const OpenAI = require("openai");


const Config = require("./config/index");
const CollegeControl = require("./Routes/colleges");
const UserControl = require("./Routes/user");
const { KarnatakaModel } = require("./models/karnataka");


mongoose.connect(Config.DATABASE.URL);
const db = mongoose.connection;


db.on("open", () => {
    console.log("db connected")
})

const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"))


app.use('/college', CollegeControl);
app.use('/user', UserControl);



const server = http.createServer({}, app)
server.listen(Config.PORT, Config.HOST, () => {
    console.log("server is working port " + Config.PORT + " and server " + Config.HOST)
});



