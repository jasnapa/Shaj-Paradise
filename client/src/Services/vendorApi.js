import axiosInstance from "../axios/axios"


export const authVendor = ()=>{
    return axiosInstance("VendorJwtKey").post('/vendor/auth')
}



export const uploadImage = (images)=>{
    return axiosInstance("VendorJwtKey").post('/vendor/uploadImage',{images})
}

export const getVendor = ()=>{
    return axiosInstance("VendorJwtKey").get('/vendor/getVendor')
}

export const addPackage = (values)=>{
    return axiosInstance("VendorJwtKey").post('/vendor/addPackage', { ...values })
}


