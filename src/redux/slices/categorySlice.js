import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      return (state = [...state, action.payload]);
    },
    delCategory: (state, action) => {
      return (state = state.filter((item) => item !== action.payload));
    },
  },
});

export const { addCategory, delCategory } = categorySlice.actions;
