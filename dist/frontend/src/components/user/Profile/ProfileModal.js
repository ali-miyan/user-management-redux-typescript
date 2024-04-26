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
const validation_1 = require("../../../pages/user/validation");
const api_1 = __importDefault(require("../../../api/api"));
const Toast_1 = require("../../../pages/user/Toast");
const react_redux_1 = require("react-redux");
const userAuthReducer_1 = require("../../../reducers/userAuthReducer");
const Modal = ({ modalOpen, toggleModal, }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const userData = JSON.parse(localStorage.getItem("user"));
    const userName = userData ? userData.name : "name";
    const userEmail = userData ? userData.email : "email";
    const userImage = userData.imgUrl ? `/public/userImages/${userData.imgUrl}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const [name, setName] = (0, react_1.useState)(userName);
    const [email, setEmail] = (0, react_1.useState)(userEmail);
    const [error, setError] = (0, react_1.useState)({
        name: "",
        email: "",
        serverError: "",
    });
    const [img, setImg] = (0, react_1.useState)(undefined);
    const [file, setFile] = (0, react_1.useState)(null);
    const handleImage = (e) => {
        var _a, _b;
        if ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) {
            setImg(URL.createObjectURL(e.target.files[0]));
            setFile((_b = e.target.files) === null || _b === void 0 ? void 0 : _b[0]);
        }
    };
    const validateForm = () => {
        const nameError = (0, validation_1.validateName)(name);
        const emailError = (0, validation_1.validateEmail)(email);
        setError({
            name: nameError,
            email: emailError,
            serverError: "",
        });
        return !(nameError || emailError);
    };
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateForm())
            return;
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("id", userData.id);
            if (file) {
                formData.append("image", file);
            }
            const response = yield api_1.default.post("/edit-user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (!response.data.status) {
                setError((prev) => (Object.assign(Object.assign({}, prev), { serverError: response.data.message })));
                return;
            }
            if (response.data.status) {
                (0, Toast_1.notifySuccess)(response.data.message);
                dispatch((0, userAuthReducer_1.setUser)(response.data.userData));
                toggleModal();
            }
            else {
                (0, Toast_1.notifyError)("something went wrong");
            }
        }
        catch (error) {
            console.log(error);
            (0, Toast_1.notifyError)("something went wrong");
        }
    });
    console.log(img, 'ddddd', userImage);
    return (<>
      {modalOpen && (<div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow max-w-xs w-full">
            <button onClick={toggleModal} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            {<span className="text-red-600">{error.serverError}</span>}
            <div className="p-4 md:p-5 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Enter your details
              </h3>
              <label htmlFor="upload-image" className="cursor-pointer">
                <img src={img ? img : userImage} alt="Modal Image" className="mx-auto rounded-full w-16 h-16 mb-5 hover:cursor-pointer"/>
                <input id="upload-image" type="file" name="image" className="hidden" onChange={handleImage}/>
              </label>
              <form>
                <div>
                  <label htmlFor="name" className="block text-gray-700  font-medium mb-1">
                    Name
                  </label>
                  <input type="text" id="name" name="name" className="border rounded-lg p-2 w-full bg-slate-300" value={name} onChange={(e) => setName(e.target.value)}/>
                  {<span className="text-red-600">{error.name}</span>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700  font-medium mb-1">
                    Email
                  </label>
                  <input type="email" id="email" name="email" className="border bg-slate-300 rounded-lg p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  {<span className="text-red-600">{error.email}</span>}
                </div>
                <div className="flex justify-center">
                  <button onClick={toggleModal} className="text-white bg-gray-500 hover:bg-gray-400 focus:ring-4 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-3">
                    Cancel
                  </button>
                  <button type="button" onClick={handleSubmit} className="text-white bg-green-950 hover:bg-green-400 focus:ring-4  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>)}
    </>);
};
exports.default = Modal;
//# sourceMappingURL=ProfileModal.js.map