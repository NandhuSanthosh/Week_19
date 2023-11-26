import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    baseUrl : "http://localhost:5500"
}

const generalSlice = createSlice( {
    name: 'general', 
    initialState, 
})

export default generalSlice;