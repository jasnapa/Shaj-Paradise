import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../Pages/Admin/AdminLoginPage";
import AdminDashPage from "../Pages/Admin/AdminDashPage";
import AdminVendorPage from "../Pages/Admin/AdminVendorPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import AdminUsersPage from "../Pages/Admin/AdminUserPage";
import AdminResortPage from "../Pages/Admin/AdminResortPage";
import AdminViewVendorPage from "../Pages/Admin/AdminViewVendorPage";
import AdminHistoryPage from "../Pages/Admin/AdminHistoryPage";
import AdminPaymentPage from "../Pages/Admin/AdminPaymentPage";
import AdminSalesReportPage from "../Pages/Admin/AdminSalesReportPage";





function AdminRouter(){
    return(
        <Routes>

            <Route element = {<PrivateRoutes role={'admin'} route={'/admin/login'}/>} >

            <Route path="dashboard" element={<AdminDashPage />}/>
            <Route path="users" element={<AdminUsersPage />}/>
            <Route path="vendors" element={<AdminVendorPage/>}/>
            <Route path="resort" element={<AdminResortPage/>}/>
            <Route path="viewVendor" element={<AdminViewVendorPage/>}/>
            <Route path="history" element={<AdminHistoryPage/>}/>
            <Route path="payment" element={<AdminPaymentPage/>}/>
            <Route path="salesReport" element={<AdminSalesReportPage/>}/>
            </Route>
            <Route path="login" element={<AdminLoginPage/>}/>

        </Routes>
    )
}

export default AdminRouter
