"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multerMiddleware_1 = require("../middleware/multerMiddleware");
const router = express_1.default.Router();
// router.post('/auth',authUser)
router.get('/auth', authMiddleware_1.authenticateUser, userController_1.auth);
router.post('/signup', userController_1.signUp);
router.post('/login', userController_1.login);
router.post('/edit-user', multerMiddleware_1.uploadProfile, userController_1.editUser);
router.post('/logout', userController_1.logout);
router.post('/get-user', userController_1.getUser);
exports.default = router;
