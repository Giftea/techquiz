import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,

    required: true,
  },
});
export const Category = mongoose.model("Category", categorySchema);

const questionSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    question: {
      type: String,
      required: true,
    },
    options: [
        { 
            answer: { type: String, required: true },
            correct : {type: Boolean, required:true}
        }
    ],
  },
  {
    timestamps: true,
  }
);
export const Question = mongoose.model("Question", questionSchema);


