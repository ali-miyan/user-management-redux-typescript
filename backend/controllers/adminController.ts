import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { uploadToCloudinary } from "../middleware/multerMiddleware";
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  console.log("server");
  console.log(req.query.search);

  const searchQuery = req.query.search;
  let userData: never[];

  if (searchQuery) {
    userData = await User.find({
      $or: [{ email: { $regex: searchQuery, $options: "i" } }],
    });
  } else {
    userData = await User.find({});
  }

  console.log(userData);

  if (userData.length > 0) {
    res.json({ status: true, data: userData });
  } else {
    res.json({ status: false, message: "No users found" });
  }
});
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (deletedUser) {
    res.json({ status: true, message: "User deleted successfully" });
  } else {
    res.json({ pass: false, message: "User not found" });
  }
});

export const adminLogin = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    console.log("login", req.body);

    if (
      process.env.ADMIN_EMAIL === email &&
      process.env.ADMIN_PASS === password
    ) {
      const adminId = generateAdminId();
      console.log("correct");

      const token = jwt.sign(
        { email, adminId },
        process.env.WEB_TOKEN as string,
        { expiresIn: "1d" }
      );
      res.cookie("adminToken", token);

      const adminData = {
        adminId,
        email,
      };

      res.json({ status: true, message: "Login successful!", adminData });
    } else {
      res.json({ pass: false, message: "Invalid email or password." });
    }
  }
);

const generateAdminId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const auth = asyncHandler(async (req: Request, res: Response) => {
  res.json({ status: true, message: "welcome to home" });
});

export const addUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    try {
      let img = "";
      const { name, email, password } = req.body;

      console.log(req.file);

      if (req.file) {
        img = await uploadToCloudinary(req.file.buffer);
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ email: false, message: "This email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        imgUrl: img,
      });
      await newUser.save();
      res.json({ status: true, message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.json({ message: "Server error" });
    }
  }
);

export const editUser = asyncHandler(async (req: Request, res: Response) => {
  let img = "";

  if (req.file) {
    img = await uploadToCloudinary(req.file.buffer);
  } else {
    const existingUser = await User.findById(req.body.id);
    if (existingUser) {
      img = existingUser.imgUrl as string;
    }
  }

  const { name, email, id } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: id },
    { name, email, imgUrl: img },
    { new: true }
  );

  if (user) {
    res.json({ status: true, message: "Successfully edited", user });
  } else {
    res.json({ status: false, message: "User not found" });
  }
});
