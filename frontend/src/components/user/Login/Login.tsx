import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../../../pages/user/Toast";
import { loginUpState } from "../../../types/signUpType";
import { validateEmail, validatePassword } from "../../../pages/user/validation";
import api from "../../../api/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../reducers/userAuthReducer";
import {useAuthentication} from "../../../Hooks/isAuthHook";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isLoggedIn } = useAuthentication();

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

  if (isLoggedIn) {
    navigate("/home");
    return null;
  }
  if (isLoading) {
    return <div>Loading...</div>;
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
      const response = await api.post("/login", {
        email: state.email,
        password: state.password,
      });

      

      if (!response.data.status) {
        setErrors((prev) => ({
          ...prev,
          serverError: response.data.message,
        }));
        return;
      }
      dispatch(setUser(response.data.userData));
      notifySuccess(response.data.message);
      navigate("/home");
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
        <p className="text-white mt-3 ml-6">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            signUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
