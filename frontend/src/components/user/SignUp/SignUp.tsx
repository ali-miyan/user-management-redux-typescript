import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../../../pages/user/Toast";
import { sighUpState } from "../../../types/signUpType";
import { validateEmail, validateName, validatePassword } from "../../../pages/user/validation";
import api from "../../../api/api";
import {useAuthentication} from "../../../Hooks/isAuthHook";


const SignupForm = () => {
  const navigate = useNavigate();
  const { isLoading, isLoggedIn } = useAuthentication();


  const [state, setState] = useState<sighUpState>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    serverError: "",
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(
      !errors.name &&
        !errors.email &&
        !errors.password &&
        state.name !== "" &&
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

    if (name === "name") {
      setErrors((prev) => ({
        ...prev,
        name: validateName(value),
      }));
    }

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
      const response = await api.post("/signup", {
        name: state.name,
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

      notifySuccess(response.data.message);
      navigate("/");
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
            className="block text-white text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow bg-white appearance-none border  w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={state.name}
            onChange={handleChange}
            name="name"
          />
          {errors.name && <span className="text-red-600">{errors.name}</span>}
        </div>
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
            Sign Up
          </button>
        </div>
        <p className="text-white mt-3 ml-6">
          Already have an account{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
