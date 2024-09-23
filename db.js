import mongoose from "mongoose";
import "dotenv/config";

// Connect to MongoDB
export default function dbConnect() {
  mongoose.connect(process.env.MONGODB_URI);
}
