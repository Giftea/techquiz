import asyncHandler from "express-async-handler";
import Category from "../models/categoriesModel.js";

//  @desc   Fetch all Category
//  @route  GET /api/categories
//  @access Private
const getCategories = asyncHandler(async (req, res) => {

  try {

    await Category.find({}).then(list => {
      res.send({
        error: false,
        data: list
      })
    })
    
  } catch (error) {
    res.send({
      error: true,
      message: "No available category",
    });
  }

});


export { getCategories };
