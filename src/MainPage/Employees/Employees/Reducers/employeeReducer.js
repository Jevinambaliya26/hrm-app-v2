import { createSlice } from "@reduxjs/toolkit"

const allEmployesState = {
    companyList: [],
    departmentList: [],
    designationList: [],
    module_permission: [],
    employeeList: [],
    editEmployee: {},
}

export const allEmployeeSlice = createSlice({
    name: "allEmployees",
    initialState: allEmployesState,
    reducers: {
        getCompanyList(state, action) {
            state.companyList = action.payload
        },
        getDepartmentList(state, action) {
            state.departmentList = action.payload
        },
        getDesignationList(state, action) {
            state.designationList = action.payload
        },
        getModulePermission(state, action) {
            state.module_permission = action.payload
        },
        getEmployeeList(state, action) {
            state.employeeList = action.payload    
        },
        getEditEmployee(state,action) {
            state.editEmployee = {...action.payload ,edit_module_loading: true}
            
        },
    }
})

export const allEmployeesAction = allEmployeeSlice.actions