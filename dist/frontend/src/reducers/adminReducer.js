"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetUserDataQuery = exports.api = void 0;
const react_1 = require("@reduxjs/toolkit/query/react");
exports.api = (0, react_1.createApi)({
    reducerPath: "api",
    baseQuery: (0, react_1.fetchBaseQuery)({ baseUrl: "http://localhost:5000/api/admin" }),
    tagTypes: ["userData"],
    endpoints: (builder) => ({
        getUserData: builder.query({
            query: () => "/get-user",
            providesTags: ["userData"],
        }),
    }),
});
exports.useGetUserDataQuery = exports.api.useGetUserDataQuery;
//# sourceMappingURL=adminReducer.js.map