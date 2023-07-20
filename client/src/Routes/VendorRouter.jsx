import React from "react";
import { Route, Routes } from "react-router-dom";
import VendorLoginPage from "../Pages/Vendor/VendorLoginPage";




function VendorRouter(){
    return(
        <Routes>
            <Route path="login" element={<VendorLoginPage/>}/>
            
        </Routes>
    )
}

export default VendorRouter
