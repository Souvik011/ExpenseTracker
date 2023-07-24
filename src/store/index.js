import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ExpenseSlice from "./ExpenseSlice";

const store = configureStore({
    reducer:{auth:AuthSlice,expense:ExpenseSlice}
});

export default store ;