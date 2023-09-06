import axiosInstance from "../axios/axios"

export const authAdmin = ()=>{
    return axiosInstance("AdminJwtKey").get('/admin/auth')
}


export const getStats = ()=>{
    return axiosInstance("AdminJwtKey").get('/admin/getStats')
}


export const adminUsers = (page, limit)=>{
    return axiosInstance("AdminJwtKey").get(`/admin/users?page=${page}&limit=${limit}`)
}


export const adminVendors = (page, limit)=>{
    return axiosInstance("AdminJwtKey").get(`/admin/vendors?page=${page}&limit=${limit}`);
}


export const adminResort = (page, limit)=>{
    return axiosInstance("AdminJwtKey").get(`/admin/resort?page=${page}&limit=${limit}`);
}


export const adminPayment = (page, limit)=>{
    return axiosInstance("AdminJwtKey").get(`/admin/adminHistory?page=${page}&limit=${limit}`);
}



export const adminHistory = (page,limit)=>{
    return axiosInstance("AdminJwtKey").get(`/admin/adminHistory?page=${page}&limit=${limit}`);
}


export const adminSales = (fromDate,toDate,page, limit)=>{
    return axiosInstance("AdminJwtKey").get(`/admin/adminHistory?fromDate=${fromDate}&toDate=${toDate}&page=${page}&limit=${limit}`);
}
