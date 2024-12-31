import { createSlice } from "@reduxjs/toolkit";

const chekoutSlice  = createSlice({
    name:'chekout',
    initialState:{shippingAddress:{}},
    reducers:{
        storecheckout(state,action){
            // console.log(action.payload)
            state.shippingAddress = action.payload
        }
    }
})

export const {storecheckout}  =chekoutSlice.actions
export default chekoutSlice.reducer
export const selectShippingAddress = (state) => state.checkout.shippingAddress || {};