import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./users/users.js";
import data from "./data/data.js";
import categories from "./data/categories.js";
import User from "./models/userModel.js";
import Question, { Category } from "./models/questionModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Question.deleteMany();
    await Category.deleteMany();

    await Category.insertMany(categories);
    await User.insertMany(users);

    const questions = data.map((quest) => {
      return { ...quest, category: categories[0]._id };
    });

    await Question.insertMany(questions);

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

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
