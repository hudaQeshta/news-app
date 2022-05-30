import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { attachAuthToken } from "../api";

const accessToken = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

const initialState = {
  accessToken,
  isAuthed: !!accessToken,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "login",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.auth.login(credentials);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.auth.register(credentials);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.accessToken = "";
      state.isAuthed = false;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },

  extraReducers: {
    [login.pending.toString()]: (state, action) => {
      state.isLoading = true;
    },
    [login.rejected.toString()]: (state, action) => {
      state.isLoading = false;
      state.isAuthed = false;
      state.error = action.payload?.response?.data?.message;
    },
    [login.fulfilled.toString()]: (state, action) => {
      const token = action.payload?.data?.access_token;
      localStorage.setItem("accessToken", token);
      state.isLoading = false;
      state.isAuthed = true;
      state.accessToken = token;
    },

    [register.pending.toString()]: (state, action) => {
      state.isLoading = true;
    },
    [register.rejected.toString()]: (state, action) => {
      state.isLoading = false;
      state.isAuthed = false;
      state.error = action.payload?.response?.data?.message;
    },
    [register.fulfilled.toString()]: (state, action) => {
      const token = action.payload?.data?.access_token;
      localStorage.setItem("accessToken", token);
      state.isLoading = false;
      state.isAuthed = true;
      state.accessToken = token;
    },
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
