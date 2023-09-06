import React from "react";
import { Route, Routes } from "react-router-dom";
import VendorLoginPage from "../Pages/Vendor/VendorLoginPage";
import VendorHomePage from "../Pages/Vendor/VendorHomePage";
import PrivateRoutes from "../utils/PrivateRoutes";
import VendorWelcomePage from "../Pages/Vendor/VendorWelcomePage";
import VendorSignupPage from "../Pages/Vendor/VendorSignupPage";
import VendorResortsPage from "../Pages/Vendor/VendorResortsPage";
import VendorProfilePage from "../Pages/Vendor/VendorProfilePage";
import VendorHistoryPage from "../Pages/Vendor/VendorHistoryPage";
import VendorChatPage from "../Pages/Vendor/VendorChatPage";




function VendorRouter(){
    return(
        <Routes>
            <Route element = {<PrivateRoutes role={'vendor'} route={'/vendor/login'}/>} >
            <Route path="home" element={<VendorHomePage/>}/>
            <Route path="welcome" element={<VendorWelcomePage/>}/>
            <Route path="resorts" element={<VendorResortsPage/>}/>
            <Route path="vendorProfile" element={<VendorProfilePage/>}/>
            <Route path="vendorHistory" element={<VendorHistoryPage/>}/>
            <Route path="vendorChat" element={<VendorChatPage/>}/>

            </Route>
          
            <Route path="login" element={<VendorLoginPage/>}/>
            <Route path="signup" element={<VendorSignupPage/>}/>
        </Routes>
    )
}

export default VendorRouter
