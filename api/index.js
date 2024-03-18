import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "./models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();
const app = express();
const PORT = 4000;

const jwtSecret = "dkfjvndfksjncdksj";

const URL = {
  TEST: "/test",
  REGISTER: "/register",
  LOGIN: "/login",
};

app.use(express.json());

app.use(
  cors({
    origins: "http://localhost:5173",
    credentials: true,
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
  try {
    await userModel
      .create({
        name,
        email,
        password: await bcryptjs.hashSync(password, 10),
      })
      .then();
    res.json({ name, email, password });
  } catch (err) {
    res.status(422).console.log(err);
  }
});

app.post(URL.LOGIN, async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await userModel.findOne({ email });
  if (userDoc) {
    const passOk = bcryptjs.compareSync(password, userDoc.password);
    if (passOk) {
      res.json("pass ok");
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json("pass ok");
        }
      );
    } else {
      res.json("pass not ok");
    }
  } else {
    res.json("not fount");
  }
});

app.listen(PORT);
console.log(
  `\n--------------------
        \nStarteed at port: ${PORT}
        \nHere is your link: http://localhost:${PORT}/
        \n--------------------`
);
//GRceVxJOdjk56Khz
