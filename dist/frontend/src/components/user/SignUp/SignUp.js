"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Toast_1 = require("../../../pages/user/Toast");
const validation_1 = require("../../../pages/user/validation");
const api_1 = __importDefault(require("../../../api/api"));
const isAuthHook_1 = __importDefault(require("../../../Hooks/isAuthHook"));
const SignupForm = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { isLoading, isLoggedIn } = (0, isAuthHook_1.default)();
    const [state, setState] = (0, react_1.useState)({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = (0, react_1.useState)({
        name: "",
        email: "",
        password: "",
        serverError: "",
    });
    const [formValid, setFormValid] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setFormValid(!errors.name &&
            !errors.email &&
            !errors.password &&
            state.name !== "" &&
            state.email !== "" &&
            state.password !== "");
    }, [state, errors]);
    if (isLoggedIn) {
        navigate("/home");
        return null;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
        if (name === "name") {
            setErrors((prev) => (Object.assign(Object.assign({}, prev), { name: (0, validation_1.validateName)(value) })));
        }
        if (name === "email") {
            setErrors((prev) => (Object.assign(Object.assign({}, prev), { email: (0, validation_1.validateEmail)(value) })));
        }
        if (name === "password") {
            setErrors((prev) => (Object.assign(Object.assign({}, prev), { password: (0, validation_1.validatePassword)(value) })));
        }
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const response = yield api_1.default.post("/signup", {
                name: state.name,
                email: state.email,
                password: state.password,
            });
            if (!response.data.status) {
                setErrors((prev) => (Object.assign(Object.assign({}, prev), { serverError: response.data.message })));
                return;
            }
            (0, Toast_1.notifySuccess)(response.data.message);
            navigate("/");
        }
        catch (error) {
            (0, Toast_1.notifyError)("something went Wrong");
            console.log(error);
        }
    });
    return (<div className="w-96 flex justify-center items-center h-screen">
      <form className="bg-green-800 rounded shadow px-16 w-96 pt-9 pb-8 mb-4" onSubmit={handleSubmit}>
        {<span className="text-red-600">{errors.serverError}</span>}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input className="shadow bg-white appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter your name" value={state.name} onChange={handleChange} name="name"/>
          {errors.name && <span className="text-red-600">{errors.name}</span>}
        </div>
        <div className="mb-4">
          <label className="block  text-white text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border bg-white  w-full py-2 px-3  text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" value={state.email} onChange={handleChange} name="email"/>
          {errors.email && <span className="text-red-600">{errors.email}</span>}
        </div>
        <div className="mb-6">
          <label className="block  text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow bg-white appearance-none border  w-full py-2 px-3  text=gray-500  leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" value={state.password} onChange={handleChange} name="password"/>
          {errors.password && (<span className="text-red-600">{errors.password}</span>)}
        </div>
        <div className="flex items-center justify-center">
          <button className={`bg-white jus hover:bg-green-100 rounded text-black font-bold py-2 px-4  focus:outline-none focus:shadow-outline ${!formValid && "opacity-50 cursor-not-allowed"}`} type="submit" disabled={!formValid}>
            Sign Up
          </button>
        </div>
        <p className="text-white mt-3 ml-6">
          Already have an account{" "}
          <react_router_dom_1.Link to="/" className="underline">
            Login
          </react_router_dom_1.Link>
        </p>
      </form>
    </div>);
};
exports.default = SignupForm;
//# sourceMappingURL=SignUp.js.map