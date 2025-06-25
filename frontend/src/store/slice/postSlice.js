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

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.post = action.payload;
    });
  },
});

export default postSlice.reducer;
