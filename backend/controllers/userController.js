import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";


//  @desc   admin login
//  @route  POST /api/admin/login
//  @access Private/Admin

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {

  }
});

//  @desc   register users
//  @route  POST /api/users
//  @access Public
const authUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, phoneNumber, gender } = req.body;
  const user = await User.create({
    fullName,
    email,
    phoneNumber,
    gender,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});


//  @desc   Get all users
//  @route  POST /api/users
//  @access Private/Admin

const getUsers = asyncHandler(async (req,res) => {
    const users = await User.find({})
    res.join(users)
})

export { authUser, adminLogin, getUsers };
