import axiosInstance from "../axios/axios"

export const authAdmin = ()=>{
    return axiosInstance("AdminJwtKey").get('/admin/auth')
}
