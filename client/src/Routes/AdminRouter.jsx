import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../Pages/Admin/AdminLoginPage";
import AdminDashPage from "../Pages/Admin/AdminDashPage";
import AdminUsersPage from "../Pages/Admin/AdminUserPage";
import AdminVendorPage from "../Pages/Admin/AdminVendorPage";





function AdminRouter(){
    return(
        <Routes>
            <Route path="login" element={<AdminLoginPage/>}/>
            <Route path="dashboard" element={<AdminDashPage/>}/>
            <Route path="users" element={<AdminUsersPage/>}/>
            <Route path="vendors" element={<AdminVendorPage/>}/>
            
        </Routes>
    )
}

export default AdminRouter
