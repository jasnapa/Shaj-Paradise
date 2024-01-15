import axios from 'axios' ;

const axiosInstance = (tokenName)=> {
  const instance = axios.create({
    baseURL:'https://shajparadise.comicworld.store' ,
    // baseURL:'http://localhost:3000' ,
    timeout : 20000 ,
    headers :{
      'Content-Type' : 'application/json'
    }
  })
   // instance request interceptor 
   instance.interceptors.request.use((request)=>{
    const token = localStorage.getItem(tokenName)
    request.headers.Authorization = `Bearer ${token}`
    return request 
  })

    return instance
    
}

export default axiosInstance