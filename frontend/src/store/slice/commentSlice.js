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

export const getPostComments = createAsyncThunk(
  "comment/getPostComments",
  async ({ postId }) => {
    const response = await authorizeAxiosInstance.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/comments/getPostComments/${postId}`
    );

    return response.data;
  }
);

export const likeComment = createAsyncThunk(
  "comment/likeComment",
  async ({ commentId }) => {
    const response = await authorizeAxiosInstance.put(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/comments/likeComment/${commentId}`
    );

    return response.data;
  }
);

export const editComment = createAsyncThunk(
  "comment/editComment",
  async ({ commentId, content }) => {
    const response = await authorizeAxiosInstance.put(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/comments/editComment/${commentId}`,
      {
        content,
      }
    );

    return response.data;
  }
);

export const getUserCommnet = createAsyncThunk(
  "comment/getUserCommnet",
  async ({ commentId }) => {
    const response = await authorizeAxiosInstance.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/comments/getUserComment/${commentId}`
    );

    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ commentId }) => {
    await authorizeAxiosInstance.delete(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/comments/deleteComment/${commentId}`
    );

    return commentId;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: null,
    postComments: null,
    like: null,
    userComment: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.postComments = action.payload;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.like = action.payload;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(getUserCommnet.fulfilled, (state, action) => {
        state.userComment = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.postComments = action.payload;
      });
  },
});

export default commentSlice.reducer;
