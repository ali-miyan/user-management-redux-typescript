"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const port = 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
(0, config_1.default)().catch(err => console.log('Database connection failed', err));
app.use("/api/users", userRoute_1.default);
app.use("/api/admin", adminRoute_1.default);
app.use(errorMiddleware_1.pageNotFound);
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
