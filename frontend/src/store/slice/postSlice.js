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
    startIndex,
    limit,
    sortDirection,
    searchTerm,
    category,
  }) => {
    const query = new URLSearchParams();
    if (userId) query.append("userId", userId);
    if (startIndex) query.append("startIndex", startIndex);
    if (limit) query.append("limit", limit);
    if (sortDirection) query.append("sortDirection", sortDirection);
    if (category) query.append("category", category);
    if (searchTerm) query.append("searchTerm", searchTerm);

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

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
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
      });
  },
});

export default postSlice.reducer;
