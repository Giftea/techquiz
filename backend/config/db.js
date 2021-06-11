import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`Gift's MongoDB connected: ${con.connection.host}`)
  } catch (error) {
      console.error(`Gift the Error is:${error.message}`)
      process.exit(1)
  }
};

export default connectDB