import { useNavigate } from "react-router-dom";
import {useAuthentication} from "../../../Hooks/isAuthHook";
import { logout } from "../../../reducers/userAuthReducer";
import { useDispatch } from "react-redux";
import api from "../../../api/api";
import { notifySuccess, notifyError } from "../../../pages/user/Toast";
import { useState } from "react";
import Modal from "./ProfileModal";
import Loader from "../../../helpers/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const { isLoading, isLoggedIn } = useAuthentication();
  const userData = JSON.parse(localStorage.getItem("user")!);
  const userName = userData ? userData.name : "username";
  const userEmail = userData ? userData.email : "useremail";
  const userImage =
    userData && userData.imgUrl
      ? `${userData?.imgUrl}`
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  if (!isLoggedIn) {
    navigate("/");
    return null;
  }

  if (isLoading) {
    <Loader isLoading />
  }

  const handleLogout = async () => {
    try {
      const response = await api.post("/logout");
      if (response.data.status) {
        notifySuccess(response.data.message);
        dispatch(logout());
        navigate("/");
      } else {
        notifyError("somthing went wrong");
      }
    } catch (error) {
      console.log(error);
      notifyError("something went wrong");
    }
  };

  return (
    <>
      <div className="w-72 mt-40 ml-8 bg-green-950 border rounded shadow">
      <p className="mt-3 text-center text-white">WELCOME HOME</p>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-20 h-20 mb-3 rounded-full object-cover shadow-lg mt-5"
            src={userImage}
            alt="Loading..."
          />

          <h5 className="mb-1 text-xl font-medium text-white">{userName}</h5>
          <span className="text-md text-gray-500">{userEmail}</span>
          <div className="flex mt-4 md:mt-6">
            <a
              onClick={toggleModal}
              className="inline-flex items-center px-5 mr-2 py-2 text-sm font-medium text-center text-dark-green-950 bg-white rounded hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300"
            >
              edit
            </a>
            <Modal modalOpen={modalOpen} toggleModal={toggleModal} />
            <a
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-dark-green-950 bg-white rounded hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
