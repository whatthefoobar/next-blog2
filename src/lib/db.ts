import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

//console.log("MONGODB_URI", MONGODB_URI);

const connectDB = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected!");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    });
    console.log("Connected!");
  } catch (error) {
    console.log("Error in connecting to the db!", error);
    throw new Error("Error in connecting to the db!");
  }
};

export default connectDB;
