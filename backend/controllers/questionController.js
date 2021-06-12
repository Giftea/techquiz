import asyncHandler from "express-async-handler";
import Question from "../models/questionModel.js";

//  @desc   Fetch all Questions
//  @route  GET /api/questions
//  @access Private
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({});
  res.json(questions);
});

//  @desc   Fetch single Question
//  @route  GET /api/question/:id
//  @access Private

const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (question) {
    res.json(question);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});


export { getQuestionById, getQuestions}