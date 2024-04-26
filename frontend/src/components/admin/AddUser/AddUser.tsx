import { useState } from "react";
import { Link } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../../pages/user/validation";
import { notifyError } from "../../../pages/user/Toast";
import { useAddUserMutation } from "../../../reducers/adminReducer";

const AddUser = () => {
  const [addUser, { isLoading }] = useAddUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    serverError: "",
  });

  const validateForm = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setError({
      name: nameError,
      email: emailError,
      password: passwordError,
      serverError: "",
    });

    return !(nameError || emailError || passwordError);
  };

  if (isLoading) {
    return <div>loading......</div>;
  }

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await addUser({ name, email, password }).unwrap();

      if (!response.email) {
        console.log('d');
        
      }
    } catch (error) {
      console.log(error);
      notifyError("error adding user");
    }
  };

  return (
    <div className="w-96 mt-24 max-w-xs text-center">
      <span className="font-bold underline">ADD USER</span>
      <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 flex justify-center">
          <label className="w-20 h-20 rounded-full overflow-hidden cursor-pointer">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="User"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 text-left text-sm font-bold">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded bg-gray-500 w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <span className="text-red-600">{error.name}</span>
        </div>
        <div>
          <label className="block text-gray-700 text-left text-sm font-bold">
            email
          </label>
          <input
            className="shadow appearance-none border rounded bg-gray-500 w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span className="text-red-600">{error.email}</span>
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-left text-sm font-bold">
            Password
          </label>
          <input
            className="shadow appearance-none bg-gray-500 border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span className="text-red-600">{error.password}</span>
        </div>
        <div className="flex  items-center justify-between">
          <button
            className="bg-green-950 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <Link
            to="/admin-dashboard"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Go back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
