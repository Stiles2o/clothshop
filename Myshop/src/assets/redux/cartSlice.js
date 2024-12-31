import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name: "cart",
    initialState: { catrItems: [], total: 0 },
    reducers: {
        ADD_TO_CART: (state, action) => {
            const itemIndex = state.catrItems.findIndex(item=>item.id==action.payload.id);
            if(itemIndex == -1 ){
                state.catrItems.push({...action.payload,qty:1})
                toast.success(`${action.payload.name} added to cart`)
            }
            else{
                toast.warning(`${action.payload.name} already added to cart`)
            }
         },
        INCREASE: (state, action) => {
            const itemIndex = state.catrItems.findIndex(item=>item.id==action.payload.id);
            if(state.catrItems[itemIndex].qty<action.payload.stock){
                state.catrItems[itemIndex].qty++
            }else toast.warning(`Only ${action.payload.stock} Avilable`)
         },
        DECREASE: (state, action) => {
            const itemIndex = state.catrItems.findIndex(item=>item.id==action.payload.id);
            if(state.catrItems[itemIndex].qty>1){
                state.catrItems[itemIndex].qty--
            }else {state.catrItems[itemIndex].qty=1}
         },
        REMOVE_FROM_CART: (state, action) => {
            const itemIndex = state.catrItems.findIndex(item=>item.id==action.payload);
            state.catrItems.splice(itemIndex,1)
         },
        EMPTY_CART: (state, action) => { 
            state.catrItems=[];state.total=0
        },
        CALCULATE_TOTAL: (state, action) => {
            state.total = state.catrItems.reduce((prev,curr)=>{return prev+(curr.sellingPrice*curr.qty)},0)
            // console.log(state.total)
         },
    }
})
export const { ADD_TO_CART,INCREASE,DECREASE,REMOVE_FROM_CART,EMPTY_CART,CALCULATE_TOTAL } = cartSlice.actions;

export default cartSlice.reducer
export const selectCartItems = (state) => state.cart.catrItems;
export const selectTotal = (state) => state.cart.total;