import asyncHandler from "express-async-handler";
import Question from "../models/questionModel.js";
import categories from "../data/categories.js";
import path from "path";
import Category from "../models/categoriesModel.js";
import fs from "fs";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
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

function checkFileType(req, res) {
  if (req.files == null) {
    res.send({
      error: true,
      message: "No file was sent",
    });
  }

  const file = req.files.file;
  const fileName = file.name.split(".")[0];
  const fileExt = file.name.split(".")[1];

  let isInCategory = categories.filter((categories) => {
    return fileName == categories.name.toLowerCase();
  });

  if (isInCategory.length > 0 && fileExt == "json") {
    let uploadPath = `./backend/uploads/${file.name}`;
    file.mv(uploadPath);
  } else {
    res.send({
      error: true,
      message: "An Invalid File Was Sent",
    });
  }
}

const uploadQuestions = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  checkFileType(req, res);
  let file = `${req.files.file.name}`;
  let fileName = file.split(".")[0];
  let updateId;
  let newQuestion;

  const selectedQuestionId = categories.filter((item) => {
    return fileName == item.name.toLowerCase();
  });
  fs.readFile(`./backend/uploads/${file}`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    updateId = selectedQuestionId[0]._id;
    newQuestion = JSON.parse(data);

    res.send({
      error: false,
      data: {
        categoryId: updateId,
        questions: newQuestion.questions,
      },
    });
  });
});

const updateQuestions = asyncHandler(async (req, res) => {
  
});

export { getQuestionById, getQuestions, uploadQuestions, updateQuestions };
