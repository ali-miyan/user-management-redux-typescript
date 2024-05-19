import { useEffect, useState } from "react";
import { UserData } from "../../../types/userType";
import { validateEmail, validateName } from "../../../pages/user/validation";
import { notifyError, notifySuccess } from "../../../pages/user/Toast";
import { useEditUserMutation } from "../../../reducers/adminReducer";

const EditModal = ({
  modalOpen,
  toggleModal,
  userData,
  onSubmitSuccess,
}: {
  modalOpen: boolean;
  toggleModal: () => void;
  userData: UserData;
  onSubmitSuccess: () => void;
}) => {
  const [editUser, { isLoading }] = useEditUserMutation();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
  }, [userData]);

  const [error, setError] = useState({
    name: "",
    email: "",
    serverError: "",
  });

  const [img, setImg] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    setImg(
      userData.imgUrl
        ? `public/userImages/${userData.imgUrl}`
        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );
  }, [userData]);

  if (isLoading) {
    return <div>LOADING......</div>;
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files?.[0]);
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
      formData.append("id", userData._id);
      if (file) {
        formData.append("image", file);
      }

      const response = await editUser(formData).unwrap();
      console.log(response, "respon");

      if (!response.status) {
        setError((prev) => ({
          ...prev,
          serverError: response.message,
        }));
        return;
      }

      if (response.status) {
        notifySuccess(response.message);
        onSubmitSuccess();
        toggleModal();
      } else {
        notifyError("something went wrong");
      }
    } catch (error) {
      console.log(error);
      notifyError("something went wrong");
    }
  };

  return (
    <>
      {modalOpen && (
        <div
          id="authentication-modal"
          aria-hidden={!modalOpen}
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-screen bg-gray-800 bg-opacity-75"
        >
          <div className="relative  p-4 w-full max-w-md">
            <div className="relative rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center bg-green-950 justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit User
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
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
              </div>
              <div className="p-4 md:p-5 bg-green-950">
                <span className="text-red-600">{error.serverError}</span>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 grid"
                  action="#"
                >
                  <div>
                    <label htmlFor="upload-image" className="cursor-pointer">
                      <img
                        src={file ? URL.createObjectURL(file) : img}
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
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Name
                    </label>
                    <input
                      type="name"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                    <span className="text-red-600">{error.name}</span>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                    <span className="text-red-600">{error.email}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white justify-center bg-green-700 hover:bg-green-400 focus:ring-4 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mx-auto"
                    style={{ minWidth: "8rem" }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
