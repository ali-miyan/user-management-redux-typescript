"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multerMiddleware_1 = require("../middleware/multerMiddleware");
const router = express_1.default.Router();
router.get('/get-user', adminController_1.getUser);
router.post('/login', adminController_1.adminLogin);
router.get('/auth-admin', authMiddleware_1.authenticateAdmin, adminController_1.auth);
router.put('/edit-user', multerMiddleware_1.upload.single('image'), adminController_1.editUser);
router.delete('/delete-user/:id', adminController_1.deleteUser);
router.post('/add-user', multerMiddleware_1.upload.single('image'), adminController_1.addUser);
exports.default = router;
