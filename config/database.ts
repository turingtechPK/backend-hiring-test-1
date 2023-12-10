import { connect } from "mongoose";

const connectDB = async () => {
  try {
    // const mongoURI = process.env.MONGO_URI!
    await connect("mongodb+srv://Shajee98:shajee98@cluster0.4wh4vfj.mongodb.net/twillio?retryWrites=true");
    console.log("Database connected...");
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;