"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const jwt = require('jsonwebtoken');
const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false, message: 'not token availale' });
    }
    jwt.verify(token, process.env.WEB_TOKEN, (err, decoded) => {
        if (err) {
            return res.json({ status: false, message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
};
exports.default = authenticateUser;
//# sourceMappingURL=authMiddleware.js.map