import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../api/http";
import axios from "axios";

export const loginUser = createAsyncThunk("user/login", async (userDetials) => {
  let response = await axios.post(`${base_url}/user/login`, userDetials);
  return response?.data.data;
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
  },
});

export default userSlice.reducer;
