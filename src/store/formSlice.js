import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../api/http";
import axios from "axios";

export const getAllForms = createAsyncThunk(
  "form/getallform",
  async (args, { getState }) => {
    try {
      const id = getState().user.user._id;
      let response = await axios.get(
        `${base_url}/form/getAllForm?userId=${id}`
      );
      return response?.data.message;
    } catch (e) {
      console.log("error ", e.message);
    }
  }
);

const userSlice = createSlice({
  name: "form",
  initialState: {
    forms: [],
  },

  reducers: {
    setFormData: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllForms.fulfilled, (state, action) => {
      state.forms = action.payload;
    });
  },
});

export const { setFormData } = userSlice.actions;

export default userSlice.reducer;
