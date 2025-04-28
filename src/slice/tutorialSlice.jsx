import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/v1/api/tutorial";

export const fetchTutorials = createAsyncThunk(
  "tutorials/fetchTutorials",
  async () => {
    const response = await axios.get(API_URL);
    return response.data.list || [];
  }
);

const tutorialSlice = createSlice({
  name: "tutorials",
  initialState: {
    tutorials: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addTutorial: (state, action) => {
      state.tutorials.push(action.payload);
    },
    removeTutorial: (state, action) => {
      state.tutorials = state.tutorials.filter(
        (tutorial) => tutorial._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTutorials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTutorials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tutorials = action.payload;
      })
      .addCase(fetchTutorials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTutorial, removeTutorial } = tutorialSlice.actions;
export default tutorialSlice.reducer;
