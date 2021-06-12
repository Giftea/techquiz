import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//  @desc   Auth users & get token
//  @route  POST /api/users/auth
//  @access Public
const authUser = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, gender, password } = req.body;

  res.send(fullName, email, phoneNumber, gender, password)
});


export default authUser