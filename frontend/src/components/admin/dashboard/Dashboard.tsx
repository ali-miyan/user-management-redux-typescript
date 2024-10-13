import { useEffect, useState } from "react";
import {
  useGetUserDataMutation,
  useDeleteUserMutation,
  useSearchUserMutation,
} from "../../../reducers/adminReducer";
import { UserData } from "../../../types/userType";
import { notifyError } from "../../../pages/user/Toast";
import { useAdminAuthentication } from "../../../Hooks/isAuthHook";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EditModal from "./DashboardModal";
import { FaSearch } from "react-icons/fa";
import Loader from "../../../helpers/Loader";

const Dashboard = () => {
  const [searchUser] = useSearchUserMutation();
  const [getUserData, { error }] = useGetUserDataMutation({});
  const [deleteUser, { isError }] = useDeleteUserMutation({});
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [search, setSearch] = useState<string>();

  const handleFormSubmitSuccess = () => {
    console.log("Form submit successful!");
    setFormSubmitted(!formSubmitted);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const response = await searchUser(e.target.value).unwrap();

    console.log(response.status, response.data, "ddddddddddd");

    if (response.data == undefined) {
      setUserData([]);
    } else {
      setUserData(response.data);
    }
  };

  const [userData, setUserData] = useState<UserData[]>([]);
  const { isLoggedIn, isFetching } = useAdminAuthentication();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState<UserData>(Object);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData({}).unwrap();
        if (response.status) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();
  }, [formSubmitted]);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2e7d32",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result:any) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteUser(id).unwrap();

          if (!response.status) {
            notifyError(response.message);
            return;
          }
          if (response.status) {
            setFormSubmitted(!formSubmitted);
          }
        } catch (error) {
          console.log(error);
          notifyError("something went wrong");
        }
      }
    });
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#2e7d32",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result:any) => {
      if (result.isConfirmed) {
        document.cookie =
          "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/admin");
      }
    });
  };

  if (isFetching) {
    <Loader isLoading />
  }

  if (!isLoggedIn) {
    navigate("/admin");
    return null;
  }

  if (error || isError) {
    console.error("Error fetching user data:", error, isError);
    return <div>Error fetching user data. Please try again later.</div>;
  }

  return (
    <>
      <div className="mt-20">
        <button
          onClick={handleLogOut}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
        <h1 className="text-center text-5xl font-bold mb-8 text-gray-900">
          <span className="text-green-600">WELCOME</span> ADMIN
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600 inline-block animate-bounce"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm1-10a1 1 0 00-2 0v3a1 1 0 002 0V6z"
              clipRule="evenodd"
            />
          </svg>
        </h1>

        <div className="flex justify-center items-center mt-6 mb-5">
          <Link
            to="/add-user"
            className="bg-gray-700 hover:bg-gray-950 text-white py-3 px-6 rounded-md"
          >
            Add User +
          </Link>
        </div>

        <div className="flex justify-center items-center mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="border bg-white border-gray-400 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto mb-16 w-full">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full grid justify-center text-center divide-y divide-gray-200 w-full bg-green-100">
                <thead className="bg-green-950 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                    >
                      IMAGE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                    >
                      Edit
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y  divide-gray-200">
                  {userData.length > 0 ? (
                    userData.map((item, index) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 text-md font-medium font-  text-gray-800 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td>
                          <img
                            src={
                              item.imgUrl
                                ? `${item.imgUrl}`
                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            }
                            className="rounded-md overflow-hidden object-cover m-2 w-14 h-14"
                            alt="Your Photo"
                          />
                        </td>
                        <td className="px-6 py-4 text-md font-   text-gray-800 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-md font-  text-gray-800 whitespace-nowrap">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 text-md font-  font-medium text-right whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedUserData(item);
                              setIsOpen(true);
                            }}
                            className="bg-green-300 hover:bg-green-400 text-green-800 font-bold py-1 px-3 rounded-full"
                          >
                            Edit
                          </button>
                        </td>
                        <td className="px-6 py-4 text-md font-  font-medium text-right whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-green-300 hover:bg-green-400 text-green-800 font-bold py-1 px-3 rounded-full"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className="m-4">
                      <span className="text-center">no users available</span>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <EditModal
        modalOpen={isOpen}
        toggleModal={() => setIsOpen(false)}
        userData={selectedUserData}
        onSubmitSuccess={handleFormSubmitSuccess}
      />
    </>
  );
};

export default Dashboard;
