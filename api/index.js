import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "./models/user.js";
//import bcrypt from "bcrypt";
dotenv.config();
const app = express();
const PORT = 4000;

//const bcryptSalt = bcrypt.genSalt(10);

const URL = {
  TEST: "/test",
  REGISTER: "/register",
  LOGIN: "/login",
};

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origins: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.MONGO_TOKEN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get(URL.TEST, (req, res) => {
  res.json("test ok");
});

app.post(URL.REGISTER, async (req, res) => {
  const { name, email, password } = req.body;
  await userModel
    .create({
      name,
      email,
      //password: bcrypt.hashSync(password, bcryptSalt),
      password,
    })
    .then();

  res.json({ name, email, password });
  console.log(`${name}, ${email}, ${password}`);
});

app.listen(PORT);
console.log(
  `\n--------------------
        \nStarteed at port: ${PORT}
        \nHere is your link: http://localhost:${PORT}/
        \n--------------------`
);
//GRceVxJOdjk56Khz
