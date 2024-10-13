import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../../../pages/user/Toast";
import { loginUpState } from "../../../types/signUpType";
import {
  validateEmail,
  validatePassword,
} from "../../../pages/user/validation";
// import { setUser } from "../../../reducers/userAuthReducer";
import { useAdminLoginMutation } from "../../../reducers/adminReducer";
import { useAdminAuthentication } from "../../../Hooks/isAuthHook";
import Loader from "../../../helpers/Loader";

const Login = () => {
  const navigate = useNavigate();

  const { isLoggedIn, isFetching } = useAdminAuthentication();

  console.log(isLoggedIn,'login');
  
  
  const [state, setState] = useState<loginUpState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    serverError: "",
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(
      !errors.email &&
        !errors.password &&
        state.email !== "" &&
        state.password !== ""
    );
  }, [state, errors]);

  const [adminLogin, { error}] = useAdminLoginMutation();

  if (isFetching) {
    return <Loader isLoading />
  }

  if(isLoggedIn){
    navigate('/admin-dashboard');
    return null
  }

  
  if (error) {
    console.error("Error fetching user data:", error);
    notifyError("unexpected error occured");
    return;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value),
      }));
    }

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await adminLogin({
        email:state.email,
        password:state.password
      }).unwrap()

      if (!response.status) {
        setErrors((prev) => ({
          ...prev,
          serverError: response.message,
        }));
        return;
      }
      // dispatch(setUser(response.userData));
      notifySuccess(response.message);
      navigate("/admin-dashboard");
    } catch (error) {
      notifyError("something went Wrong");
      console.log(error);
    }
  };

  return (
    <div className="w-96 flex justify-center items-center h-screen">
      <form
        className="bg-green-800 rounded shadow px-16 w-96 pt-9 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <p className="text-center mb-3">
          <span className="bg-black text-white px-2 py-1 ">admin login</span>
        </p>
        {<span className="text-red-600">{errors.serverError}</span>}
        <div className="mb-4">
          <label
            className="block  text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border bg-white  w-full py-2 px-3  text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={state.email}
            onChange={handleChange}
            name="email"
          />
          {errors.email && <span className="text-red-600">{errors.email}</span>}
        </div>
        <div className="mb-6">
          <label
            className="block  text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow bg-white appearance-none border  w-full py-2 px-3  text=gray-500  leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={state.password}
            onChange={handleChange}
            name="password"
          />
          {errors.password && (
            <span className="text-red-600">{errors.password}</span>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            className={`bg-white jus hover:bg-green-100 rounded text-black font-bold py-2 px-4  focus:outline-none focus:shadow-outline ${
              !formValid && "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!formValid}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
