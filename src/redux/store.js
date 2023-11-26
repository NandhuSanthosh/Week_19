import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./general/reducer";
import userSliceReducer from './user/reducer';
import adminSlice from './admin/reducer'

const store = configureStore({
    reducer: {
        general: generalSlice.reducer, 
        user: userSliceReducer, 
        admin: adminSlice
    }
})

export default store;