import React from "react";
import { Route, Routes } from "react-router-dom";
import VendorLoginPage from "../Pages/Vendor/VendorLoginPage";
import VendorHomePage from "../Pages/Vendor/VendorHomePage";
import PrivateRoutes from "../utils/PrivateRoutes";
import VendorWelcomePage from "../Pages/Vendor/VendorWelcomePage";
import VendorPackagePage from "../Pages/Vendor/VendorResortsPage";
import VendorSignupPage from "../Pages/Vendor/VendorSignupPage";
import VendorResortsPage from "../Pages/Vendor/VendorResortsPage";




function VendorRouter(){
    return(
        <Routes>
            <Route element = {<PrivateRoutes role={'vendor'} route={'/vendor/login'}/>} >
            <Route path="home" element={<VendorHomePage/>}/>
            <Route path="welcome" element={<VendorWelcomePage/>}/>
            <Route path="resorts" element={<VendorResortsPage/>}/>
            </Route>
          
            <Route path="login" element={<VendorLoginPage/>}/>
            <Route path="signup" element={<VendorSignupPage/>}/>
        </Routes>
    )
}

export default VendorRouter
