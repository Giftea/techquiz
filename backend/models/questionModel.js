import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,

    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
const Category = mongoose.model("Category", categorySchema);


const questionSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    question: {
      type: String,
      required: true,
    },
    options: [{ answer: String, correct: Boolean }],
  },
  {
    timestamps: true,
  }
);
const Question = mongoose.model("Question", questionSchema);

export default Question;
