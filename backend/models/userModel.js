import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDoneWithQuiz:{
      type: Boolean,
      required: true,
      default:false
    },
    quizMetaData: {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category"
      },
      score: {
        type : Number
      },
      timeFinished: {
        type : Number
      }
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function(next){
if(!this.isModified('password')){
  next()
}
const salt = await bcrypt.genSalt(10 )
this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema);

export default User;
