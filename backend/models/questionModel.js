import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    questionTitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    optionOne: {
      type: String,
      required: true,
    },

    optionTwo: {
      type: String,
      required: true,
    },

    optionThree: {
      type: String,
      required: true,
    },

    correctOption: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
const Question = mongoose.model("Question", questionSchema);

export default Question;
