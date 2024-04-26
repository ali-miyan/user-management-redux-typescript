import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'
import User from "../models/userModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();



export const getUser = asyncHandler(async (req: Request, res: Response) => {
    console.log('dddddddddddd');
    
    const userData = await User.find({})
    if (userData.length > 0) {
        res.json({status:true, data:userData})
    } else {
        res.json({ user: false, message: 'no users found' })
    }
});
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (deletedUser) {
        res.json({ status: true, message: 'User deleted successfully' });
    } else {
        res.json({ pass: false, message: 'User not found' });
    }
});


export const adminLogin = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    console.log('login',req.body);

        if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASS === password) {
            const adminId = generateAdminId();
            console.log('correct');
            

            const token = jwt.sign({ email,adminId }, process.env.WEB_TOKEN, { expiresIn: '1d' })
            res.cookie('adminToken', token)

            const adminData = {
                adminId,
                email
            }

            res.json({ status: true, message: 'Login successful!', adminData });
        } else {
            res.json({ pass: false, message: 'Invalid email or password.' });
        }
});

const generateAdminId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};

export const auth = asyncHandler(async (req: Request, res: Response) => {
    res.json({ status: true, message: 'welcome to home' })
});

export const addUser = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({email:false,message: 'This email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.json({status:true, message:'User created successfully'});
  
    } catch (error) {
      console.error(error);
      res.json({ message: 'Server error' });
    }
  };

export const editUser = asyncHandler(async (req: Request, res: Response) => {
    let img = '';

    if (req.file && req.file.filename) {
        img = req.file.filename;
    } else {
        const existingUser = await User.findById(req.body.id);
        if (existingUser) {
            img = existingUser.imgUrl;
        }
    }

    const { name, email, id } = req.body;

    const user = await User.findOneAndUpdate(
        { _id: id },
        { name, email, imgUrl: img },
        { new: true }
    );

    if (user) {
        res.json({ status: true, message: 'Successfully edited' });
    } else {
        res.json({ status: false, message: 'User not found' });
    }
});

