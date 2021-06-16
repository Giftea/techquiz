import asyncHandler from "express-async-handler";
import Category from "../models/categoriesModel.js";

//  @desc   Fetch all Category
//  @route  GET /api/categories
//  @access Private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});


export { getCategories };
