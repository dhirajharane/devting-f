import { createSlice } from "@reduxjs/toolkit";

const requestsSlice=createSlice({
    name:"requests",
    initialState:[],
    reducers:{
        addRequests:(state,action)=>action.payload,
        removeRequest:(state,action)=>{
            const newArray=state.filter((r)=>r._id!==action.payload);
            return newArray;
        },

    }
})

export default requestsSlice.reducer;
export const { addRequests,removeRequest } = requestsSlice.actions;