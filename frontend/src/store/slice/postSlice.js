import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "~/utils/authorizeAxios";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData) => {
    const response = await authorizeAxiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/create`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log(response.data);

    return response.data;
  }
);

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async ({
    userId,
    postId,
    startIndex,
    limit,
    slug,
    sortDirection,
    searchTerm,
    category,
  }) => {
    const query = new URLSearchParams();
    if (userId) query.append("userId", userId);
    if (postId) query.append("postId", postId);
    if (startIndex) query.append("startIndex", startIndex);
    if (limit) query.append("limit", limit);
    if (sortDirection) query.append("sortDirection", sortDirection);
    if (category) query.append("category", category);
    if (searchTerm) query.append("searchTerm", searchTerm);
    if (slug) query.append("slug", slug);

    const response = await authorizeAxiosInstance.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/posts/getposts?${query.toString()}`
    );

    return response.data;
  }
);

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  await authorizeAxiosInstance.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/deletepost/${id}`
  );

  return id;
});

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (postId, formData) => {
    const response = await authorizeAxiosInstance.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/updatepost/${postId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const getCurrentPost = createAsyncThunk(
  "post/getCurrentPost",
  async ({ postId }) => {
    const response = await authorizeAxiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/currentpost/${postId}`
    );

    return response.data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
    selectedPost: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.post = state.post.filter((p) => p._id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log(action.payload);

        const index = state.post.findIndex((p) => p._id === action.payload.id);
        if (index !== -1) {
          state.post[index] = action.payload;
        }
      })
      .addCase(getCurrentPost.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
      });
  },
});

export default postSlice.reducer;
