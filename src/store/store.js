import { configureStore } from "@reduxjs/toolkit";
import { reducer as user } from "./slices/userSlice";

export const store = configureStore({
    reducer: {user}
})