import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import expressfileupload from "express-fileupload";
import multer from "multer";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import  Question from "./models/questionModel.js";
import  Category from "./models/categoriesModel.js";
import { KeyObject } from "crypto";
import questionRoutes from './routes/questionRoutes.js'
import { notFound, errorHandler } from "./middleware/errorMiddleWare.js";


dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressfileupload());
let upload = multer({ dest: "./" });

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use('/api/questions', questionRoutes)

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server created by giiftea"));



// app.get("/categories", async (req, res) => {
  //   let categories = await Category.find();
  //   res.send(categories);
  // });
  
  // app.get("/questions", async (req, res) => {
  //   let category = req.body.category;
  //   let questions = await Question.find({ category });
  //   res.send(questions);
  // });
  
  // app.post("/questions", upload.single("file"), async (req, res) => {
  //   try {
  //     let category = req.body.category;
  //     let jsonFile = req.body.files;
  //     // fs.readFile("./newques.json", "utf8", function (err, data) {
  //     //   if (err) res.send(err);
  //     //   obj = JSON.parse(data);
  //     //   res.send(obj);
  //     // });
  //     // let category = req.body.category;
  //     // let questions = await Question.find({ category });
  //     // res.send(req.files);
  //   } catch (e) {
  //     res.send("An error occurred uploading file");
  //   }
  // });