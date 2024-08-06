import { createSlice } from "@reduxjs/toolkit";

export const machineSlice = createSlice({
    name: 'machine',
    initialState: "kat-qala",
    reducers: {
        setFilial: (state, action) => {
            return (state = action.payload)
        }
    }
})

export const {setFilial} = machineSlice.actions;