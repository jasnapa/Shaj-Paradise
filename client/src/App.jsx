import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import AdminRouter from "./Routes/AdminRouter"
import UserRouter from "./Routes/UserRouter"
import VendorRouter from "./Routes/VendorRouter";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App(){
  axios.defaults.baseURL ='https://shajparadise.comicworld.store' ;
  axios.defaults.withCredentials = true;
  return(
    <BrowserRouter>
    <Routes>

      <Route path="/admin/*" element={<AdminRouter />}/>


      <Route path='/*' element={<UserRouter/>}/>


      <Route path="/vendor/*" element={<VendorRouter/>}/>

    </Routes>
     <ToastContainer /> 
  </BrowserRouter>
  )
}

  
  

export default App