import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../api/http";
import axios from "axios";

export const loginUser = createAsyncThunk("user/login", async (userDetails) => {
  try {
    const response = await axios.post(`${base_url}/user/login`, userDetails);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  return {}; // Clear user data by returning an empty object
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = {}; // Clear user data from the state upon successful logout
    });
  },
});

export default userSlice.reducer;
