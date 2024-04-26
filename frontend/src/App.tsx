import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/user/Signup";
import LoginPage from "./pages/user/Login";
import { Provider } from "react-redux";
import store from "./stores/store";
import { Toast } from "./pages/user/Toast";
import ProfilePage from "./pages/user/Profile";
import DashboardPage from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AddUser from "./components/admin/AddUser/AddUser";

function App() {
  return (
    <>
        <Provider store={store}>
          <div className="flex items-center justify-center">
            <div>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/home" element={<ProfilePage />} />
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin-dashboard" element={<DashboardPage />} />
                  <Route path="/add-user" element={<AddUser />} />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
          <Toast />
        </Provider>
    </>
  );
}

export default App;
