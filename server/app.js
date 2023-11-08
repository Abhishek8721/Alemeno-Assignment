const express = require('express')
const mongoose = require("mongoose")
const auth = require("./Routes/auth")
const courses = require("./Routes/courses")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};


dotenv.config();
app.use(cookieParser())
app.use(express.json());
app.use(cors(corsOptions));
app.use(auth)
app.use(courses)
mongoose
.connect(process.env.MONGO)
.then(() => {
  console.log("Connected to DB");
})
.catch((err) => {
  console.log(err);
});
app.get('/',(req,res)=>{
    res.send("hello")
})
app.listen(8000,(req,res)=>{
console.log("server is running at 8000");
})