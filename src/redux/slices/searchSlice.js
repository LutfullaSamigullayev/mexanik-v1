import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: [],
  reducers: {
    setSearch: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setSearch } = searchSlice.actions;
