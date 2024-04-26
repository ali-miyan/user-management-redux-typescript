"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Signup_1 = __importDefault(require("./pages/user/Signup"));
const Login_1 = __importDefault(require("./pages/user/Login"));
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("./stores/store"));
const adminStore_1 = require("./stores/adminStore");
const Toast_1 = require("./pages/user/Toast");
const Profile_1 = __importDefault(require("./pages/user/Profile"));
const Dashboard_1 = __importDefault(require("./pages/admin/Dashboard"));
const AdminLogin_1 = __importDefault(require("./pages/admin/AdminLogin"));
function App() {
    return (<>
      <react_redux_1.Provider store={adminStore_1.adminStore}>
        <react_redux_1.Provider store={store_1.default}>
          <div className="flex items-center justify-center">
            <div>
              <react_router_dom_1.BrowserRouter>
                <react_router_dom_1.Routes>
                  <react_router_dom_1.Route path="/" element={<Login_1.default />}/>
                  <react_router_dom_1.Route path="/signup" element={<Signup_1.default />}/>
                  <react_router_dom_1.Route path="/home" element={<Profile_1.default />}/>
                  <react_router_dom_1.Route path="/admin" element={<AdminLogin_1.default />}/>
                  <react_router_dom_1.Route path="/admin-dashboard" element={<Dashboard_1.default />}/>
                </react_router_dom_1.Routes>
              </react_router_dom_1.BrowserRouter>
            </div>
          </div>
          <Toast_1.Toast />
        </react_redux_1.Provider>
      </react_redux_1.Provider>
    </>);
}
exports.default = App;
//# sourceMappingURL=App.js.map