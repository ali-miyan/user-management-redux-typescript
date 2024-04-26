"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.validateEmail = exports.validateName = void 0;
const validateName = (value) => {
    if (!value || value.trim() === "") {
        return "Name is required";
    }
    return "";
};
exports.validateName = validateName;
const validateEmail = (value) => {
    if (!value || value.trim() === "") {
        return "Email is required";
    }
    else if (!/^\S+@\S+\.\S+$/.test(value)) {
        return "Invalid email address";
    }
    return "";
};
exports.validateEmail = validateEmail;
const validatePassword = (value) => {
    if (!value || value.trim() === "") {
        return "Password is required";
    }
    else if (value.length < 8) {
        return "Password is too short";
    }
    return "";
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=validation.js.map