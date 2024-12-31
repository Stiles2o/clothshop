import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{isLoggedIn:sessionStorage.getItem("shoplogin")?JSON.parse(sessionStorage.getItem("shoplogin")).isLoggedIn:false,
        username:sessionStorage.getItem("shoplogin")?JSON.parse(sessionStorage.getItem("shoplogin")).username:'',
        email:sessionStorage.getItem("shoplogin")?JSON.parse(sessionStorage.getItem("shoplogin")).email:'',
        id:sessionStorage.getItem("shoplogin")?JSON.parse(sessionStorage.getItem("shoplogin")).id:'',
        role:sessionStorage.getItem("shoplogin")?JSON.parse(sessionStorage.getItem("shoplogin")).role:''},
    reducers:{
        LOGIN_USER(state,action){
            // console.log(action.payload)
            let {isLoggedIn , username , email , id , role} = action.payload
            state.isLoggedIn = isLoggedIn
            state.username =username
            state.email =email
            state.id =id
            state.role =role
        },
        LOGOUT_USER(state,action){
            state.isLoggedIn = false
            state.username =''
            state.email =''
            state.id =''
            state.role =''
        },

    }
})
export const {LOGIN_USER,LOGOUT_USER} = authSlice.actions
export default authSlice.reducer
export const selectIsLoggedIn = state=>state.auth.isLoggedIn
export const selectUsername = state=>state.auth.username
export const selectEmail = state=>state.auth.email
export const selectId = state=>state.auth.id
export const selectRole = state=>state.auth.role