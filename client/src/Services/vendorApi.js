import axiosInstance from "../axios/axios"


export const authVendor = ()=>{
    return axiosInstance("VendorJwtKey").post('/vendor/auth')
}

export const Home = ()=>{
    return axiosInstance("VendorJwtKey").get("/vendor/home")
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

export const editProfile = (values)=>{
    return axiosInstance("VendorJwtKey").patch('/vendor/editProfile',{...values})   
}


export const vendorBooking = (page, limit)=>{
    return axiosInstance("VendorJwtKey").get(`/vendor/vendorBooking?page=${page}&limit=${limit}`)
}

export const editResort = ( values,images,locations,place,_id)=>{
    return axiosInstance("VendorJwtKey").patch("/vendor/editResort",{...values,images,locations,place,_id})
}