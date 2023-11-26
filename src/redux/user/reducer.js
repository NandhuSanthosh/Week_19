import { createSlice } from "@reduxjs/toolkit"
const initialState = {}

const userSlice = createSlice({
    name: 'user', 
    initialState, 
    reducers: {
        loggedIn(state, action){
            return action.payload
        }, 
        updated(state, action){
            console.log(action.payload)
            return action.payload
        }
    }
})

export const {loggedIn, updated} = userSlice.actions
export default userSlice.reducer
