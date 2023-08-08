import React from "react"
import {Route, Routes} from "react-router-dom"
import UserLoginPage from "../Pages/User/UserLoginPage";
import UserSignupPage from "../Pages/User/UserSighupPage";
import EmailVerifyPage from "../Pages/User/EmailVerifyPage";
import UserResortPage from "../Pages/User/UserResortPage";
import HomePage from "../Pages/User/HomePage";
import ResortViewPage from "../Pages/User/ResortViewPage";
import UserPackagePage from "../Pages/User/UserPackagePage";






function UserRouter(){
    
    return(
        <Routes>

            {/* <Route element = {<PrivateRoutes role={'user'} route={'/login'}/>}> 


            
            </Route> */}

            <Route path="/login" element={<UserLoginPage/>}/>
            <Route path="/signup" element={<UserSignupPage/>}/>
            <Route path="/verifyMail" element={<EmailVerifyPage />} />
            <Route path="/" element={<HomePage />}/>
            <Route path="/resorts" element={<UserResortPage />}/>
            <Route path="/viewResorts" element={<ResortViewPage />}/>
            <Route path="/userPackages/:id" element={<UserPackagePage />}/>
        </Routes>
    )
}

export default UserRouter