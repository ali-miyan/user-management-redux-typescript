import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/admin",
    credentials: "include",
  }),

  tagTypes: ["userData"],
  endpoints: (builder) => ({
    getUserData: builder.mutation({
      query: () => ({
        url: "/get-user",
        method: "GET",
      }),
    }),
    searchUser: builder.mutation({
      query: (query) => ({
        url: `/get-user?search=${query}`,
        method: "GET",
      }),
    }),
    adminLogin: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body: body,
      }),
    }),
    adminAuth: builder.mutation({
      query: () => ({
        url: "/auth-admin",
        method: "GET",
      }),
      invalidatesTags: ["userData"],
    }),
    editUser: builder.mutation({
      query: (body) => ({
        url: "/edit-user",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["userData"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["userData"],
    }),
    addUser: builder.mutation({
      query: (body) => ({
        url: `/add-user`,
        method: "POST",
        body:body
      }),
      invalidatesTags: ["userData"],
    }),
  }),
});

export const {
  useGetUserDataMutation,
  useAdminLoginMutation,
  useAdminAuthMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useAddUserMutation,
  useSearchUserMutation
} = api;
