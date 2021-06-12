import express from "express";
import asyncHandler from "express-async-handler";
import { Question } from "../models/questionModel.js";

const router = express.Router();

//  @desc   Fetch all Questions
//  @route  GET /api/questions
//  @access Private

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const questions = await Question.find({});
    res.json(questions);
  })
);

//  @desc   Fetch single Question
//  @route  GET /api/question/:id
//  @access Private 

router.get(
  "/:id",
  asyncHandler( async (req, res) => {
    const question = await Question.findById(req.params.id);

    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ messsage: "Question not found" });
    }
  })
);

export default router;
