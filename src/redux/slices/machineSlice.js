import { createSlice } from "@reduxjs/toolkit";

const location2 = localStorage.getItem("location")
console.log(location2)

export const machineSlice = createSlice({
  name: "machine",
  initialState: location2 == 'admin' ? 'katqala' : location2,
  reducers: {
    setFilial: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setFilial } = machineSlice.actions;
