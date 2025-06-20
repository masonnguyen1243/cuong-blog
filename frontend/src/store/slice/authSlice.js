import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "~/utils/authorizeAxios";

export const SignInUser = createAsyncThunk("auth/signin", async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-in`,
    data
  );

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SignInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
