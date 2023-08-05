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

export const addResort = (values,images,locations,place)=>{
    return axiosInstance("VendorJwtKey").post('/vendor/addResort', { ...values,images,locations,place})
}

export const viewResorts = ()=>{
    return axiosInstance("VendorJwtKey").get("/vendor/resorts")
}

