import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";
import { baseURL } from "@/utils/constants";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: customBaseQuery(baseURL),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/user/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: "/user/register",
                method: "POST",
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/user/logout",
                method: "POST",
            }),
        })
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;