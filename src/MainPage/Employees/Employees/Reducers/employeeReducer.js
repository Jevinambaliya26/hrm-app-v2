import { createSlice } from "@reduxjs/toolkit"

const allEmployesState = {
    companyList: [],
    departmentList: [],
    designationList: [],
    module_permission: []
}

export const allEmployeeSlice = createSlice({
    name: "allEmployees",
    initialState: allEmployesState,
    reducers: {
         getCompanyList(state , action){
            state.companyList =  action.payload
        },
        getDepartmentList(state, action) {
            state.departmentList = action.payload
        },
        getDesignationList(state , action){
            state.designationList = action.payload
        },
        getModulePermission(state , action){
            state.module_permission = action.payload
        },
        
    }
})

export const allEmployeesAction = allEmployeeSlice.actions