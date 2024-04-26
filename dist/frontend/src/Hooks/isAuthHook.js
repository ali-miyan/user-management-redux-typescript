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
const react_1 = require("react");
const api_1 = __importDefault(require("../api/api"));
const useAuthentication = () => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const isLogin = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield api_1.default.get('/auth', { withCredentials: true });
                if (response.data.status) {
                    setIsLoggedIn(true);
                }
                else {
                    setIsLoggedIn(false);
                }
            }
            catch (error) {
                setIsLoggedIn(false);
                console.error('Error checking authentication:', error);
            }
            finally {
                setIsLoading(false);
            }
        });
        isLogin();
    }, []);
    return { isLoading, isLoggedIn };
};
exports.default = useAuthentication;
//# sourceMappingURL=isAuthHook.js.map