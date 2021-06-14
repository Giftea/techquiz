import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import data from "./data/data.js";
import categories from "./data/categories.js";
import User from "./models/userModel.js";
import Question from "./models/questionModel.js";
import Category from "./models/categoriesModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Question.deleteMany();
    await Category.deleteMany();

    const createdCategories = await Category.insertMany(categories);
    await User.insertMany(users);

    await Question.insertMany({
      category: createdCategories[0]._id,
      question: data,
    });

    console.log("Questions imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Question.deleteMany();
    await Category.deleteMany();

    console.log("Questions destroyed");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv.splice(2)["-d"]) {
  destroyData();
} else {
  importData();
}
