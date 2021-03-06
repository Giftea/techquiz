import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import fs from "fs";
import expressfileupload from "express-fileupload";
import multer from "multer";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Question from "./models/questionModel.js";
import Category from "./models/categoriesModel.js";
import { KeyObject } from "crypto";
import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleWare.js";

dotenv.config();

connectDB();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
app.use('*', cors({
  origin: "*",
  methods: ['GET','POST','PUT','PATCH','DELETE','HEAD']
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressfileupload());



app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server Status: Up & Running ✌"));

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



