import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//  @desc   admin login
//  @route  POST /api/admin/login
//  @access Private/Admin

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//  @desc   admin wipe user data
//  @route  PURGE /api/admin/:wipe
//  @access Private/Admin

const wipeUserData = asyncHandler(async (req, res) => {

  const { wipe } = req.params;

  if(wipe == "user"){

    await User.deleteMany();
    res.send({
      error: false,
      message: "User data cleared"
    })

  }else{

    res.send({
      error: true,
      message: "Cannot process request" 
    })

  }

});

export { adminLogin, wipeUserData};
