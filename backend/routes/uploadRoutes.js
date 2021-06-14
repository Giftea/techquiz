import path from "path";
import express from "express";
import multer from "multer";
import categories from "../data/categories.js";
import Question from "../models/questionModel.js";
import Category from "../models/categoriesModel.js";
import asyncHandler from "express-async-handler";
import axios from "axios";

import { uploadQuestions } from "../controllers/questionController.js";

const router = express.Router();

router.post("/", uploadQuestions);

export default router;
