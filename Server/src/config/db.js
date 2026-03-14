import mongoose from "mongoose";

// Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected!");
  } catch (error) {
    console.log(
      "Something went wrong while Connecting Database!",
      error.message,
    );
    process.exit(1);
  }
};

//  Connection Events
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected event fired");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

export default connectDB;
