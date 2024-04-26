"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminReducer_1 = require("../../../reducers/adminReducer");
const Dashboard = () => {
    const { data: usersData, error, isLoading } = (0, adminReducer_1.useGetUserDataQuery)({});
    console.log(usersData);
    if (isLoading)
        return <div>Loading...</div>;
    if (error) {
        // Handle error
        console.error("Error fetching user data:", error);
        return <div>Error fetching user data. Please try again later.</div>;
    }
    const users = usersData !== null && usersData !== void 0 ? usersData : []; // Ensure usersData is an array, default to empty array if null
    return (<div className="flex flex-col mt-20">
      <h1 className="text-center underline text-4xl font-medium">
        WELCOME ADMIN
      </h1>
      <p className="underline mt-3 text-center text-black">Users</p>
      <div className="overflow-x-auto mb-16 w-full">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 w-full bg-green-100">
              <thead className="bg-green-950 ">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">
                    IMAGE
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-white uppercase ">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-center text-white uppercase ">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-center text-white uppercase ">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((item, index) => (<tr key={item._id}>
                    <td className="px-6 py-4 text-md font-medium font-  text-gray-800 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td>
                      <img src={item.imgUrl
                ? `/public/userImages/${item.imgUrl}`
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="rounded-md font-  overflow-hidden m-2 w-14 h-14" alt="Your Photo"/>
                    </td>
                    <td className="px-6 py-4 text-md font-   text-gray-800 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-md font-  text-gray-800 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 text-md font-  font-medium text-right whitespace-nowrap">
                      <button className="bg-green-300 hover:bg-green-400 text-green-800 font-bold py-1 px-3 rounded-full">
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4 text-md font-  font-medium text-right whitespace-nowrap">
                      <button className="bg-green-300 hover:bg-green-400 text-green-800 font-bold py-1 px-3 rounded-full">
                        Delete
                      </button>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map