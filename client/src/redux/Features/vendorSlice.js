import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: "",
    name: "",
    email: "",
    mobile: "",
    description: "",
    images: "",
}


const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {
        setVendorDetails: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name
            state.email = action.payload.email
            state.mobile = action.payload.mobile
            state.description = action.payload.description
            state.images = action.payload.image
            
        },
        setVendorSignout: (state, action) => {
            state.id = null;
            state.name = null
            state.email = null
            state.phone = null
            state.description = null
            state.images= null
        },

    }
})

export const {setVendorDetails , setVendorSignout} = vendorSlice.actions

export default vendorSlice.reducer