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
const react_router_dom_1 = require("react-router-dom");
const isAuthHook_1 = __importDefault(require("../../../Hooks/isAuthHook"));
const userAuthReducer_1 = require("../../../reducers/userAuthReducer");
const react_redux_1 = require("react-redux");
const api_1 = __importDefault(require("../../../api/api"));
const Toast_1 = require("../../../pages/user/Toast");
const react_1 = require("react");
const ProfileModal_1 = __importDefault(require("./ProfileModal"));
const Profile = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const [modalOpen, setModalOpen] = (0, react_1.useState)(false);
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };
    const { isLoading, isLoggedIn } = (0, isAuthHook_1.default)();
    const userData = JSON.parse(localStorage.getItem("user"));
    const userName = userData ? userData.name : "username";
    const userEmail = userData ? userData.email : "useremail";
    const userImage = userData && userData.imgUrl
        ? `/public/userImages/${userData === null || userData === void 0 ? void 0 : userData.imgUrl}`
        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    if (!isLoggedIn) {
        navigate("/");
        return null;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield api_1.default.post("/logout");
            if (response.data.status) {
                (0, Toast_1.notifySuccess)(response.data.message);
                dispatch((0, userAuthReducer_1.logout)());
                navigate("/");
            }
            else {
                (0, Toast_1.notifyError)("somthing went wrong");
            }
        }
        catch (error) {
            console.log(error);
            (0, Toast_1.notifyError)("something went wrong");
        }
    });
    return (<>
      <div className="w-72 mt-40 ml-8 bg-green-950 border rounded shadow">
      <p className="mt-3 text-center text-white">WELCOME HOME</p>
        <div className="flex flex-col items-center pb-10">
          <img className="w-20 h-20 mb-3 rounded-full shadow-lg mt-5" src={userImage} alt="Loading..."/>

          <h5 className="mb-1 text-xl font-medium text-white">{userName}</h5>
          <span className="text-md text-gray-500">{userEmail}</span>
          <div className="flex mt-4 md:mt-6">
            <a onClick={toggleModal} className="inline-flex items-center px-5 mr-2 py-2 text-sm font-medium text-center text-dark-green-950 bg-white rounded hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300">
              edit
            </a>
            <ProfileModal_1.default modalOpen={modalOpen} toggleModal={toggleModal}/>
            <a onClick={handleLogout} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-dark-green-950 bg-white rounded hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300">
              Logout
            </a>
          </div>
        </div>
      </div>
    </>);
};
exports.default = Profile;
//# sourceMappingURL=Profile.js.map