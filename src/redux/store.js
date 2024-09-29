import { configureStore } from "@reduxjs/toolkit";
import { machineSlice } from './slices/machineSlice';
import { categorySlice } from "./slices/categorySlice";
import { lineSlice } from "./slices/lineSlice";
import { authSlice } from "./slices/authSlice";
import { searchSlice } from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        filial: machineSlice.reducer,
        category: categorySlice.reducer,
        line: lineSlice.reducer,
        auth: authSlice.reducer,
        search: searchSlice.reducer,
    }
}) 