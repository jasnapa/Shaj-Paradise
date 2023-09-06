import axiosInstance from "../axios/axios";

export const createChat = (vendorId,userId) =>{
    return axiosInstance("UserJwtKey").post('/chat/createChat', {vendorId,userId})
}

export const chatRoom = (id) =>{
    return axiosInstance("UserJwtKey").get(`/chat/${id}`);
}

export const getVendor = (id) =>{
    return axiosInstance("UserJwtKey").get(`/chat/vendor/${id}`);
}
export const getUser = (id) =>{
    return axiosInstance("VendorJwtKey").get(`/chat/user/${id}`);
}


export const findChat = (firstId, secondId) => axios.get(`/chat/find/${firstId}/${secondId}`);

//messages api

 
export const getMessages = (id) => {
    return axiosInstance("UserJwtKey").get(`/message/${id}`);
}

export const sendMessage = (data) => {
    return axiosInstance("UserJwtKey").post('/message/', {...data})
}