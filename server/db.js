import mongoose, { Types } from "mongoose";
import "dotenv/config";

// Connect to MongoDB
export default async function dbConnect() {
  await mongoose.connect(process.env.MONGODB_URI);
}

//Schemas

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  creatorId: {
    type: Types.ObjectId,
    ref: "adminSchema",
  },
});

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: Types.ObjectId,
    ref: "userSchema",
  },
  courseId: {
    type: Types.ObjectId,
    ref: "courseSchema",
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

// Models

export const User = mongoose.model("User", userSchema);
export const Admin = mongoose.model("Admin", adminSchema);
export const Course = mongoose.model("Course", courseSchema);
export const Purchase = mongoose.model("Purchase", purchaseSchema);
