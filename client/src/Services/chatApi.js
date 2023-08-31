import axiosInstance from "../axios/axios";

export const createChat = (data) => axios.post('/chat/', data);

export const chatRoom = (id) =>{
    return axiosInstance("UserJwtKey").get(`/chat/${id}`);
}



export const findChat = (firstId, secondId) => axios.get(`/chat/find/${firstId}/${secondId}`);

//message api


export const getMessages = (id) => {
    return axiosInstance("UserJwtKey").get(`/message/${id}`);
}

export const sendMessage = (data) => {
    return axiosInstance("UserJwtKey").post('/message/', {data})
}