import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Post"],  
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
      providesTags: ["Post"],
    }),

    createPost: builder.mutation({
      query: (postData) => ({
        url: "posts",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Post"],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...postData }) => ({
        url: `posts/${id}`, 
        method: "PUT",
        body: postData,
      }),
      invalidatesTags: ["Post"], 
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"], 
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
