import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "~/utils/authorizeAxios";

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ userId, postId, content }) => {
    const response = await authorizeAxiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/comments/create`,
      { userId, postId, content }
    );

    return response.data;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export default commentSlice.reducer;
