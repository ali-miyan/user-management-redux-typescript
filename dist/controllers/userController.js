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
exports.logout = exports.getUser = exports.editUser = exports.login = exports.signUp = exports.auth = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multerMiddleware_1 = require("../middleware/multerMiddleware");
require("dotenv").config();
exports.auth = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ status: true, message: 'welcome to home' });
}));
exports.signUp = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    console.log('ddd');
    const existingUser = yield userModel_1.default.findOne({ email });
    if (existingUser) {
        console.log('dd1');
        res.json({ status: false, message: 'This email already exists' });
        return;
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = new userModel_1.default({
        name,
        email,
        password: hashedPassword
    });
    yield newUser.save();
    res.json({ status: true, message: 'Signed up successfully!' });
}));
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log('login');
    const user = yield userModel_1.default.findOne({ email });
    console.log(process.env.WEB_TOKEN);
    if (user) {
        const check = yield bcryptjs_1.default.compare(password, user.password);
        if (check) {
            const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.WEB_TOKEN, { expiresIn: '1d' });
            res.cookie('token', token);
            const userData = {
                id: user._id,
                name: user.name,
                email: user.email,
                imgUrl: user.imgUrl ? user.imgUrl : ""
            };
            res.json({ status: true, message: 'Login successful!', userData });
        }
        else {
            res.json({ status: false, message: 'Invalid email or password.' });
        }
    }
    else {
        res.json({ status: false, message: 'User not found.' });
    }
}));
exports.editUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let img = '';
    console.log(req.file);
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
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            imgUrl: user.imgUrl
        };
        res.json({ status: true, message: 'Successfully edited', userData });
    }
    else {
        res.json({ status: false, message: 'User not found' });
    }
}));
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    res.json({ status: true, message: 'logged out successfully' });
}));
exports.logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('token');
    res.json({ status: true, message: 'logged out successfully' });
}));
