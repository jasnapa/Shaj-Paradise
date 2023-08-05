import { configureStore } from "@reduxjs/toolkit";
import vendorSlice from "../Features/vendorSlice";
import userSlice from "../Features/userSlice";





export default configureStore({


    reducer: {

      user : userSlice ,
      vendor : vendorSlice ,
      
    }
  })