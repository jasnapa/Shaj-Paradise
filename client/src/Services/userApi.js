import axiosInstance from "../axios/axios"




export const authUser = ()=>{
    return axiosInstance("UserJwtKey").get('/user/auth')
}

export const booking = (resort,checkin,checkout,person)=>{
    return axiosInstance("UserJwtKey").post('/booking',{resort,checkin,checkout,person})
}



