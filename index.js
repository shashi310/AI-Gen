const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/users.routes");
const { courseRouter } = require("./routes/course.routes");

const cors = require('cors')

require("dotenv").config();

const jwt = require("jsonwebtoken");

const app = express();

app.use(cors())

app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the backend of TalentBridge");
});

app.use("/users", userRouter);
app.use("/jobs", courseRouter);

//process.env.port
app.listen(8080, async () => {
  try {
    await connection;
    console.log(`connected to db \nrunning at port 8080`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
});
