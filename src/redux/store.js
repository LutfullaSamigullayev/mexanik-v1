import { configureStore } from "@reduxjs/toolkit";
import { machineSlice } from "./slices/machineSlice";

export const store = configureStore({
    reducer: {
        filial: machineSlice.reducer
    }
}) 