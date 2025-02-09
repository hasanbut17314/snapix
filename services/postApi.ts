import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";
import { baseURL } from "../utils/constants";

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: customBaseQuery(baseURL),
    tagTypes: ["Post"],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: ({ page = 1, limit = 10, search, tags, mediaType }) => ({
                url: `/post/getPosts?page=${page}&limit=${limit}${search ? `&search=${search}` : ""}${tags ? `&tags=${tags}` : ""}${mediaType ? `&mediaType=${mediaType}` : ""}`,
                method: "GET",
            }),
            providesTags: ["Post"],
        }),
        toggleLike: builder.mutation({
            query: ({ postId }) => ({
                url: `/post/toggleLike/${postId}`,
                method: "POST",
            }),
            invalidatesTags: ["Post"],
        })
    }),
});

export const {
    useGetPostsQuery,
    useToggleLikeMutation
} = postApi;