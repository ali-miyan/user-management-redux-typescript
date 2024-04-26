"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfile = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: "frontend/public/userImages",
    filename: (req, file, callback) => {
        const filename = file.originalname;
        callback(null, filename);
    }
});
const profile = (0, multer_1.default)({ storage: storage });
exports.uploadProfile = profile.single('image');
//# sourceMappingURL=multerMiddleware.js.map