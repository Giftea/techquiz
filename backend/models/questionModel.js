import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category"
        },
        questions: [
         { 
            question: {
              type: String,
              required: true,
            },
            options: [
              {
                answer: { type: String, required: true },
                correct: { type: Boolean, required: true },
              },
            ],
          }
        ]
    
  },
  {
    timestamps: true,
  }
);
const Question = mongoose.model("Question", questionSchema);

export default Question;
