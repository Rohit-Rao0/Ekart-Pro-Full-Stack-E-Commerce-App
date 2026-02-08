import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { sendOTPEmail } from "../emailVerify/sendOTPEmail.js";
import { Session } from "../models/sessionModel.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email);
    newUser.token = token;
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in user registration:", error);
  }
};

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1]; //Bearer fkgcbikewhbiuk then [Bearer, fkgcbikewhbiuk]
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.token !== token) {
      return res.status(401).json({ message: "Invalid verification token" });
    }

    user.isVerified = true;
    user.token = null;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reVerify = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isVerified) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "10m",
      });
      verifyEmail(token, email);
      user.token = token;
      await user.save();
      return res
        .status(200)
        .json({ message: "Verification email sent again ", token: token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!existingUser.isVerified) {
      return res.status(401).json({ message: "Email not verified" });
    }

    //generate access and refresh token
    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10d" },
    );
    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" },
    );
    existingUser.isLoggedIn = true; // Mark user as logged in
    await existingUser.save();

    const existingSession = await Session.findOne({ userId: existingUser._id });
    if (existingSession) {
      await Session.deleteOne({ userId: existingUser._id });
    } else {
      console.log("No existing session found for user, creating new session.");
    }

    await Session.create({ userId: existingUser._id });

    return res.status(200).json({
      message: `Login successful  ${existingUser.firstName}`,
      success:true,
      user: existingUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Session.deleteMany({ userId: user._id });
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });
    return res.status(200).json({ message: "Logout successful ",success:true });
  } catch (error) {
    res.status(500).json({ message: error.message,
      success:false
     });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = Math.floor(10000 + Math.random() * 900000).toString(); // Generate a 5-digit OTP
    user.otp = otp;
    const TEN_MINUTES = 10 * 60 * 1000;
    user.otpExpiryTime = Date.now() + TEN_MINUTES;

    await user.save();
    //send otp to email
    await sendOTPEmail(otp, email);
    return res.status(200).json({ message: "OTP sent to email", otp }); // In production, do not send OTP in response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiryTime < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    if (user.otp === otp) {
      return res.status(200).json({ message: "OTP verified successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password are required" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    
    if (newPassword === confirmPassword) {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      user.password = passwordHash;
      user.otp = null;
      user.otpExpiryTime = null;
      await user.save();
      return res.status(200).json({ message: "Password changed successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const allUser = async(req,res)=>{
  try {
    const users=await User.find();
    
    return res.status(200).json({users});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getUserById= async(req,res)=>{
  try {
    const {userId}=req.params;
    const user = await User.findById(userId).select("-password -otp -otpExpiryTime -token");

    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({user});
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
}
