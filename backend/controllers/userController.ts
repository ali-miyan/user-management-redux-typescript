import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'
import User from "../models/userModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { uploadToCloudinary } from "../middleware/multerMiddleware";
require("dotenv").config();




export const auth = asyncHandler(async (req: Request, res: Response) => {
    res.json({ status: true, message: 'welcome to home' })
});

export const signUp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    console.log('ddd');

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log('dd1');
        res.json({ status: false, message: 'This email already exists' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();

    res.json({ status: true, message: 'Signed up successfully!' });
});
export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    console.log('login');

    const user = await User.findOne({ email });
    console.log(process.env.WEB_TOKEN);

    if (user) {
        const check = await bcrypt.compare(password, user.password);
        if (check) {
            const token = jwt.sign({ email: user.email }, process.env.WEB_TOKEN as string, { expiresIn: '1d' })
            res.cookie('token', token)

            const userData = {
                id: user._id,
                name: user.name,
                email: user.email,
                imgUrl: user.imgUrl ? user.imgUrl : ""
            }

            res.json({ status: true, message: 'Login successful!', userData });
        } else {
            res.json({ status: false, message: 'Invalid email or password.' });
        }
    } else {
        res.json({ status: false, message: 'User not found.' });
    }
});

export const editUser = asyncHandler(async (req: Request, res: Response) => {
    let img = '';

    console.log(req.file);  
    

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
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            imgUrl: user.imgUrl
        };
        res.json({ status: true, message: 'Successfully edited', userData });
    } else {
        res.json({ status: false, message: 'User not found' });
    }
});


export const getUser = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    
    res.json({ status: true, message: 'logged out successfully' })
});


export const logout = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie('token')
    res.json({ status: true, message: 'logged out successfully' })
});


