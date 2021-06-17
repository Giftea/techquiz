import { response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


//  @desc   register users
//  @route  POST /api/users
//  @access Public
const authUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, phoneNumber, gender } = req.body;

  try {

    await User.findOne({ email }).then(async response => {
      if(response != null){
        res.send({
          error: true,
          message: "Account already exist"
        })
      }else{
        const createUser = await User.create({
          fullName,
          email,
          phoneNumber,
          gender,
          password,
        }).then(result => {
          res.send({
            error: false,
            message: "Account Created",
            data: {
              _id: result._id,
              name: result.name,
              email: result.email,
              phoneNumber: result.phoneNumber,
              gender: result.gender,
            },
          });
        }).catch(error => {
          res.send({
            error: true,
            message: error,
          });
        })
      }
    })
    
  } catch (error) {
    res.send({
      error: true,
      message: error
    })
  }


});

//  @desc   Get all users
//  @route  GET /api/users
//  @access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  let projection = {
    _id: true,
    fullName: true,
    email: true,
    phoneNumber: true,
    gender: true,
  };

  try {
    
    await User.find({}, projection).then(response => {
      res.send({
        error: false,
        data: response,
      });
    })

  } catch (error) {
    res.send({
      error: true,
      message: error,
    });
  }

});


//  @desc   Get all users done with quiz
//  @route  GET /api/users/done?:id
//  @access Private/Admin

const getUsersDoneWithQuiz = asyncHandler(async (req, res) => {
  let filter = {isDoneWithQuiz: true}
  if(req.params.id != undefined){
    filter.isAdmin = false;
    filter["quizMetaData.category"] = req.params.id;
  }

  let projection = {
    quizMetaData: true,
    _id: true,
    fullName: true,
    email: true,
    phoneNumber: true,
    gender: true,
  };

  try {
    
    const usersDone = await User.find(filter,projection);
    if(usersDone.length === 0){
      res.send({
        error: true,
        message: "No user done with quiz",
        data: usersDone
      });
    }else{
      res.send({
        error: false,
        data: usersDone,
      });
    }

  } catch (error) {
    res.send({
      error: true,
      data: error,
    });
  }

});



//  @desc   Populate a user meta data
//  @route  PATCH /api/users/meta
//  @access Public

const setQuizMetaData = asyncHandler(async (req, res) => {

  try{
    
    const {
      _id,
      category,
      score,
      timeFinished
    } = req.body;
  
    if( _id == undefined || category == undefined || score == undefined ||timeFinished == undefined){
        res.send({
          error:true,
          message:"Incorrect Meta Data Sent (a field might be missing)"
        })
    }else{
  
      let newUpdates = {
        isDoneWithQuiz: true,
        quizMetaData: {
          category,
          score,
          timeFinished
        }
      };
        
      const metaDataUpdate = await User.updateOne(
        {
          _id,
          isDoneWithQuiz:false
        },
        { $set: newUpdates },
        { upsert: false }
      );
        
        
      res.send({
        error : false,
        message : "Quiz ended"
      });
  
    }

  }catch(error){
    
    res.send({
      error: true,
      message: error,
    });

  }


});

export { authUser, getUsers, getUsersDoneWithQuiz, setQuizMetaData };
