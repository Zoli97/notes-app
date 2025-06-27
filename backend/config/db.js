import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//function where i can connect to db
export const connectDB = async () => {
  try {
    //take a little bit of time just put await
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully !");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); //exit with fail
  }
};
