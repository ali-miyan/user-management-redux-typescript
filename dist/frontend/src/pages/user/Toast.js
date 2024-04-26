"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyError = exports.notifySuccess = exports.Toast = void 0;
// Toast.tsx
const react_1 = __importDefault(require("react"));
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const notifySuccess = (message) => react_toastify_1.toast.success(message);
exports.notifySuccess = notifySuccess;
const notifyError = (message) => react_toastify_1.toast.error(message);
exports.notifyError = notifyError;
const Toast = () => {
    return (<react_toastify_1.ToastContainer position="top-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>);
};
exports.Toast = Toast;
//# sourceMappingURL=Toast.js.map