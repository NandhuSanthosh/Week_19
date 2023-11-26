import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    searchKey : "", 
    dataSource : []
}

const adminSlice = createSlice({
    name: 'user', 
    initialState, 
    reducers: {
        dataFetched(state, action){
            return {
                ...state, 
                dataSource: action.payload
            }
        },
        searchInput(state, action){
            console.log(action.payload)
            return {
                ...state, 
                searchKey: action.payload
            }
        }
    }
})

export const {searchInput, dataFetched} = adminSlice.actions
export default adminSlice.reducer