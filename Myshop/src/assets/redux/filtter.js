import { createSlice } from "@reduxjs/toolkit";

const filertSlice = createSlice({
    name:'filter',
    initialState:{filterProducts:[],catvalue:'',priceval:0,searchval:''},
    reducers:{
        filterbycategory(state,action){
            // console.log(action.payload)
            let {products,category} =action.payload
            if(category !=''){
               const filter =  products.filter(item=>item.category==category)
               state.filterProducts = filter
            //    console.log(state.filterProducts)
            }
            state.catvalue = category;
            // console.log(state.catvalue); 
        },
        filterbyprice(state,action){
             let {products,sellingPrice} =action.payload
            if(sellingPrice !=0){
               const filter =  products.filter(item=>item.sellingPrice<=sellingPrice)
               state.filterProducts = filter
            //    console.log(state.filterProducts)
            }
            state.priceval = sellingPrice;
            // console.log(state.priceval); 

        },
        filterbysearch(state,action){
            let {products,search} =action.payload
           if(search !=''){
              const filter =  products.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
              state.filterProducts = filter
           //    console.log(state.filterProducts)
           }
           state.searchval = search;
           // console.log(state.priceval); 
       }
        
    }
})
export const {filterbycategory,filterbyprice,filterbysearch} = filertSlice.actions
export default filertSlice.reducer
export const selectFilter = state => state.filter.filterProducts;
export const selectCategory = state => state.filter.catvalue;
export const selectPrice = state => state.filter.priceval;
export const selectSearch = state => state.filter.searchval;

