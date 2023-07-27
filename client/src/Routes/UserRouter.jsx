import React from "react"
import {Route, Routes} from "react-router-dom"
import UserLoginPage from "../Pages/User/UserLoginPage";
import UserSignupPage from "../Pages/User/UserSighupPage";
import EmailVerifyPage from "../Pages/User/EmailVerifyPage";
import UserResortPage from "../Pages/User/UserResortPage";
import HomePage from "../Pages/User/HomePage";





function UserRouter(){
    return(
        <Routes>

            <Route path="/login" element={<UserLoginPage/>}/>
            <Route path="/signup" element={<UserSignupPage/>}/>
            <Route path="/verifyMail" element={<EmailVerifyPage />} />
            <Route path="/" element={<HomePage />}/>
            <Route path="/resorts" element={<UserResortPage />}/>
         

        </Routes>
    )
}

export default UserRouter