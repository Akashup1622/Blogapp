import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    user: JSON.parse( localStorage.getItem("loginDetails")) || null
}

const AuthSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logOut:(state,action)=>{
            localStorage.removeItem("loginDetails")
            state.user=null 

        },
        signin:(state,action)=>{
            state.user=action.payload
        }
    }
})
export const {logOut,signin}=AuthSlice.actions
export default AuthSlice.reducer 