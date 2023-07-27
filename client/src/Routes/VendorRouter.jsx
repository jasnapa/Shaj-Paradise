import React from "react";
import { Route, Routes } from "react-router-dom";
import VendorLoginPage from "../Pages/Vendor/VendorLoginPage";
import VendorHomePage from "../Pages/Vendor/VendorHomePage";




function VendorRouter(){
    return(
        <Routes>
            <Route path="login" element={<VendorLoginPage/>}/>
            <Route path="home" element={<VendorHomePage/>}/>
            
        </Routes>
    )
}

export default VendorRouter
