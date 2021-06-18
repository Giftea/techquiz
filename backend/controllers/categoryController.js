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



//  @desc   Delete all Category
//  @route  DELETE /api/categories
//  @access Private
const deleteCategories = asyncHandler(async (req, res) => {

  try {

    await Category.deleteMany({});

    res.send({
      error: false,
      message: "Category list deleted"
    })
    
  } catch (error) {
    res.send({
      error: true,
      message: "An error occurred while deleting categories",
    });
  }

});


//  @desc   Add Category
//  @route  POST /api/categories
//  @access Private
const addCategory = asyncHandler(async (req, res) => {
  const {name} = req.body;

  try {
    if(name != undefined ){

      await Category.insertMany({name});

      res.send({
        error: false,
        message: `${name} category created`,
      });

    }else{
      throw "Category name cannot be empty";      
    }

  } catch (error) {
    res.send({
      error: true,
      message: error,
    });
  }

});



//  @desc   Delete Category
//  @route  DELETE /api/categories/:id
//  @access Private
const deleteOneCategory = asyncHandler(async (req, res) => {
  const {id} = req.params;

  try {

    await Category.deleteOne({_id : id});

    res.send({
      error: false,
      message: `Category with ${id} deleted`,
    });

  } catch (error) {
    res.send({
      error: true,
      message: error,
    });
  }

});


export { getCategories, deleteCategories, addCategory, deleteOneCategory };
