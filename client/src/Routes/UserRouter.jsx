import React from "react"
import {Route, Routes} from "react-router-dom"
import UserLoginPage from "../Pages/User/UserLoginPage";
import UserSignupPage from "../Pages/User/UserSighupPage";
import EmailVerifyPage from "../Pages/User/EmailVerifyPage";
import UserResortPage from "../Pages/User/UserResortPage";
import HomePage from "../Pages/User/HomePage";
import ResortViewPage from "../Pages/User/ResortViewPage";
import UserPackagePage from "../Pages/User/UserPackagePage";
import UserBookingPage from "../Pages/User/UserBooking";
import SuccessPage from "../Pages/User/SuccessPage";
import BookingPage from "../Pages/User/BookingPage";
import UserProfilePage from "../Pages/User/UserProfile";
import UserChatPage from "../Pages/User/UserChatPage";
import CashSuccessPage from "../Pages/User/CashSuccessPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import NotFoundPage from "../Pages/404/NotFoundPage";






function UserRouter(){
    
    
    return(
        <Routes>

            <Route element = {<PrivateRoutes role={'user'} route={'/login'}/>}> 

            <Route path="/userPackages/:id" element={<UserPackagePage />}/>
            <Route path="/userBooking" element={<UserBookingPage />}/>
            <Route path="/booking" element={<BookingPage />}/>
            <Route path="/success" element={<SuccessPage/>}/>
            <Route path="/successCash" element={<CashSuccessPage/>}/>
            <Route path="/profile" element={<UserProfilePage />}/>
            <Route path="/chat" element={<UserChatPage />}/>

            
            </Route>

            <Route path="/login" element={<UserLoginPage/>}/>
            <Route path="/signup" element={<UserSignupPage/>}/>
            <Route path="/verifyMail" element={<EmailVerifyPage />} />
            <Route path="/" element={<HomePage />}/>
            <Route path="/resorts" element={<UserResortPage />}/>
            <Route path="/viewResorts" element={<ResortViewPage />}/>
            <Route path="/*" element={<NotFoundPage/>}/>
           
        </Routes>
    )
}

export default UserRouter