import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePic: {
      //cloudinary url
      type: String,
      default: "",
    },
    profilePicPublicid: {
      //cloudinary public id
      type: String,
      default: "",
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
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    token: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    otp: {  
      type: String,

      default: "",
    },
    otpExpiryTime: {
      type: Date,
      default: null,
    },
    address: {
      type: String ,
    },
    city: {
      type: String ,
    },
    zipCode: {
      type: String,
      default: "",
    },
    phoneNo: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);