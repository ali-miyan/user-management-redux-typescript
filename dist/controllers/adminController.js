"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.addUser = exports.auth = exports.adminLogin = exports.deleteUser = exports.getUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = require("cloudinary");
const multerMiddleware_1 = require("../middleware/multerMiddleware");
require("dotenv").config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("server");
    console.log(req.query.search);
    const searchQuery = req.query.search;
    let userData;
    if (searchQuery) {
        userData = yield userModel_1.default.find({
            $or: [{ email: { $regex: searchQuery, $options: "i" } }],
        });
    }
    else {
        userData = yield userModel_1.default.find({});
    }
    console.log(userData);
    if (userData.length > 0) {
        res.json({ status: true, data: userData });
    }
    else {
        res.json({ status: false, message: "No users found" });
    }
}));
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield userModel_1.default.findByIdAndDelete(req.params.id);
    if (deletedUser) {
        res.json({ status: true, message: "User deleted successfully" });
    }
    else {
        res.json({ pass: false, message: "User not found" });
    }
}));
exports.adminLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("login", req.body);
    if (process.env.ADMIN_EMAIL === email &&
        process.env.ADMIN_PASS === password) {
        const adminId = generateAdminId();
        console.log("correct");
        const token = jsonwebtoken_1.default.sign({ email, adminId }, process.env.WEB_TOKEN, { expiresIn: "1d" });
        res.cookie("adminToken", token);
        const adminData = {
            adminId,
            email,
        };
        res.json({ status: true, message: "Login successful!", adminData });
    }
    else {
        res.json({ pass: false, message: "Invalid email or password." });
    }
}));
const generateAdminId = () => {
    return Math.random().toString(36).substr(2, 9);
};
exports.auth = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ status: true, message: "welcome to home" });
}));
exports.addUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let img = "";
        const { name, email, password } = req.body;
        console.log(req.file);
        if (req.file) {
            img = yield (0, multerMiddleware_1.uploadToCloudinary)(req.file.buffer);
        }
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.json({ email: false, message: "This email already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.default({
            name,
            email,
            password: hashedPassword,
            imgUrl: img,
        });
        yield newUser.save();
        res.json({ status: true, message: "User created successfully" });
    }
    catch (error) {
        console.error(error);
        res.json({ message: "Server error" });
    }
}));
exports.editUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let img = "";
    if (req.file) {
        img = yield (0, multerMiddleware_1.uploadToCloudinary)(req.file.buffer);
    }
    else {
        const existingUser = yield userModel_1.default.findById(req.body.id);
        if (existingUser) {
            img = existingUser.imgUrl;
        }
    }
    const { name, email, id } = req.body;
    const user = yield userModel_1.default.findOneAndUpdate({ _id: id }, { name, email, imgUrl: img }, { new: true });
    if (user) {
        res.json({ status: true, message: "Successfully edited", user });
    }
    else {
        res.json({ status: false, message: "User not found" });
    }
}));
