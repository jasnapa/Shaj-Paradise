import axiosInstance from "../axios/axios"




export const authUser = ()=>{
    return axiosInstance("UserJwtKey").get('/user/auth')
}

export const booking = (resort,vendor,checkin,checkout,person,paymentMethod,orderId)=>{
    return axiosInstance("UserJwtKey").post('/booking',{resort,vendor,checkin,checkout,person,paymentMethod,orderId})
}

export const bookingHistory = ()=>{
    return axiosInstance("UserJwtKey").get('/bookingHistory')
}

export const userProfile = ()=>{
    return axiosInstance("UserJwtKey").get("/profile")
}


export const userOnlinePay = (amount)=>{
    return axiosInstance("UserJwtKey").post('/payment',{amount})
}

export const verifyPayment = (response)=>{
    return axiosInstance("UserJwtKey").post('/verifyPayment',{response})
}


export const ResortAvailability = (fromDate,toDate,resort)=>{
    return axiosInstance("UserJwtKey").post('/resortAvailability',{fromDate,toDate,resort})   
}


export const saveProfile = (values)=>{
    return axiosInstance("UserJwtKey").patch('/saveProfile',{...values})   
}

