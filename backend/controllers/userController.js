import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


//  @desc   register users
//  @route  POST /api/users
//  @access Public
const authUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, phoneNumber, gender } = req.body;

  try {

    const findUser = User.findOne({ email });
    findUser.then(async response => {
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
        })
        
        createUser.then(result => {
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

  const users = await User.find({}, projection);

  res.json({
    error : false,
    data : users
  });
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

  const usersDone = await User.find(filter,projection);
  if(usersDone.length === 0){
    res.send({
      error: false,
      message: "No user done with quiz",
      data: usersDone
    });
  }else{
    res.send({
      error: false,
      data: usersDone,
    });
  }
});



//  @desc   Populate a user meta data
//  @route  PATCH /api/users/meta
//  @access Public

const setQuizMetaData = asyncHandler(async (req, res) => {

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


});

export { authUser, getUsers, getUsersDoneWithQuiz, setQuizMetaData };
