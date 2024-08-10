import { configureStore } from "@reduxjs/toolkit";
import { machineSlice } from './slices/machineSlice';
import { categorySlice } from "./slices/categorySlice";
import { lineSlice } from "./slices/lineSlice";

export const store = configureStore({
    reducer: {
        filial: machineSlice.reducer,
        category: categorySlice.reducer,
        line: lineSlice.reducer,
    }
}) 