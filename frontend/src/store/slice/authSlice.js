import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "~/utils/authorizeAxios";

export const SignInUser = createAsyncThunk("auth/SignInUser", async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-in`,
    data
  );

  return response.data;
});

export const SignUpUser = createAsyncThunk("auth/SignUpUser", async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
    data
  );

  return response.data;
});

export const SignInWithGoogle = createAsyncThunk(
  "auth/SignInWithGoogle",
  async (data) => {
    const response = await authorizeAxiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
      data
    );

    return response.data;
  }
);

export const LogoutUser = createAsyncThunk("auth/LogoutUser", async () => {
  const response = await authorizeAxiosInstance.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`
  );

  return response.data;
});

export const GetCurrentUser = createAsyncThunk(
  "auth/GetCurrentUser",
  async () => {
    const response = await authorizeAxiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`
    );

    return response.data;
  }
);

export const UpdateUser = createAsyncThunk(
  "auth/UpdateUser",
  async ({ id, formInput }) => {
    console.log("id", id);

    const response = await authorizeAxiosInstance.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/update/${id}`,
      formInput
    );

    return response.data;
  }
);

export const getUsers = createAsyncThunk("auth/getUsers", async () => {
  const response = await authorizeAxiosInstance.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/getusers`
  );

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(SignUpUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(SignInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(GetCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        const updatedUser = action.payload;

        const userIndex = state.user.findIndex(
          (user) => user._id === updatedUser._id
        );
        if (userIndex !== -1) {
          state.user[userIndex] = updatedUser;
        }
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      });
  },
});

export default authSlice.reducer;
