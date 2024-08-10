import { createSlice } from "@reduxjs/toolkit";

export const lineSlice = createSlice({
  name: "line",
  initialState: [],
  reducers: {
    setLine: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setLine } = lineSlice.actions;
