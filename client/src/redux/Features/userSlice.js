import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: "",
    name: "",
    email: "",
    mobile: "",
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name
            state.email = action.payload.email
            state.mobile = action.payload.mobile
            state.address = action.payload.address
        },
        setUserSignout: (state, action) => {
            state.id = null;
            state.name = null
            state.email = null
            state.phone = null
        },

    }
})

export const {setUserDetails , setUserSignout} = userSlice.actions

export default userSlice.reducer