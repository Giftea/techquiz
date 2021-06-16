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
  res.send({
    error:false,
    data:questions
  })
});


//  @desc   Fetch single Question
//  @route  GET /api/question/:id
//  @access Private

const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.find({category:req.params.id});

  if (question[0]) {
    res.send({
      error:false,
      data: question
    });
  } else {
    res.send({
      error:true,
      message: "No Question found with specified ID"
    })
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

//  @desc   Upload Question JSON file
//  @route  POST /api/question/
//  @access Private

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
    try{
      if (err) {
        console.error(err);
        throw "An Error Occurred reading file";
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

    }catch(error){
      res.send({
          error: true,
          message: error,
      });
    }
  });
});


//  @desc   Upload Question extract from JSON
//  @route  POST /api/question/uploads/data
//  @access Private
const upsertQuestions = asyncHandler(async (req, res) => {
  const categoryID = req.body.data.categoryId;
  const newQuestions = req.body.data.questions;

  let upsertRequest = await Question.updateOne(
    { category: categoryID },
    { $set: {questions : newQuestions} },
    { upsert:true }
    );
  res.send({
    error: false,
    data: "Questions Uploaded",
  });
});

export { getQuestionById, getQuestions, uploadQuestions, upsertQuestions };
