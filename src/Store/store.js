import { configureStore } from "@reduxjs/toolkit";
import { allEmployeeSlice } from "../MainPage/Employees/Employees/Reducers/employeeReducer";

export const store = configureStore({
    reducer: {
        allEmployees : allEmployeeSlice.reducer
    }
})

