import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "./models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import multer from "multer";
import fs from 'fs';
dotenv.config();
const app = express();
const PORT = 4000;
const __dirname = "C:/Users/egorp/git-repositories/GeekBoards/api";
const jwtSecret = "dkfjvndfksjncdksj";

const URL = {
  TEST: "/test",
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
  PROFILE: "/profile",
  UPLOAD_BY_LINK: "/upload-by-link",
  UPLOADS: "/uploads",
  UPLOAD: "/upload",
};

app.use(express.json());
app.use(cookieParser());
app.use(URL.UPLOADS, express.static(__dirname + "/uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
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
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.json("pass not ok");
    }
  } else {
    res.json("not fount");
  }
});

app.get(URL.PROFILE, (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, id } = await userModel.findById(userData.id);
      res.json({ name, email, id });
    });
  } else {
    res.json(null);
  }
  //res.json({token});
});

app.post(URL.LOGOUT, (req, res) => {
  res.cookie("token", "").json(true);
});

app.post(URL.UPLOAD_BY_LINK, async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  try {
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (err) {
    console.log("couldn't get an image. Error: " + err.message);
  }
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post(URL.UPLOAD, photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/",""));
  }

  res.json(uploadFiles);
});

app.listen(PORT);
console.log(
  `\n--------------------
        \nStarteed at port: ${PORT}
        \nHere is your link: http://localhost:${PORT}/
        \n--------------------`
);
