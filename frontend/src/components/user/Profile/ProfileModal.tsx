import React, { useState } from "react";
import { validateName, validateEmail } from "../../../pages/user/validation";
import api from "../../../api/api";
import { notifyError, notifySuccess } from "../../../pages/user/Toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../../reducers/userAuthReducer";

const Modal = ({
  modalOpen,
  toggleModal,
}: {
  modalOpen: boolean;
  toggleModal: () => void;
}) => {
  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("user")!);
  const userName = userData ? userData.name : "name";
  const userEmail = userData ? userData.email : "email";
  const userImage = userData.imgUrl ?  `/public/userImages/${userData.imgUrl}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [error, setError] = useState({
    name: "",
    email: "",
    serverError: "",
  });
  const [img, setImg] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);


  const handleImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files?.[0])
    }
  };

  const validateForm = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);

    setError({
      name: nameError,
      email: emailError,
      serverError: "",
    });

    return !(nameError || emailError);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("id", userData.id);
      if (file) {
        formData.append("image", file);
      }
      const response = await api.post("/edit-user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.status) {
        setError((prev) => ({
          ...prev,
          serverError: response.data.message,
        }));
        return;
      }


      if (response.data.status) {
        notifySuccess(response.data.message);
        dispatch(setUser(response.data.userData));
        toggleModal();
      } else {
        notifyError("something went wrong");
      }
    } catch (error) {
      console.log(error);
      notifyError("something went wrong");
    }
  };
console.log(img,'ddddd',userImage);

  return (
    <>
      {modalOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow max-w-xs w-full">
            <button
              onClick={toggleModal}
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            {<span className="text-red-600">{error.serverError}</span>}
            <div className="p-4 md:p-5 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Enter your details
              </h3>
              <label htmlFor="upload-image" className="cursor-pointer">
                <img
                  src={img?img:userImage}
                  alt="Modal Image"
                  className="mx-auto rounded-full w-16 h-16 mb-5 hover:cursor-pointer"
                />
                <input
                  id="upload-image"
                  type="file"
                  name="image"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
              <form>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700  font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="border rounded-lg p-2 w-full bg-slate-300"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {<span className="text-red-600">{error.name}</span>}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700  font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border bg-slate-300 rounded-lg p-2 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {<span className="text-red-600">{error.email}</span>}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={toggleModal}
                    className="text-white bg-gray-500 hover:bg-gray-400 focus:ring-4 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white bg-green-950 hover:bg-green-400 focus:ring-4  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
