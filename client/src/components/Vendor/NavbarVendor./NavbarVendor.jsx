import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authVendor, getVendor } from "../../../Services/vendorApi";
import { setVendorDetails, setVendorSignout } from "../../../redux/Features/vendorSlice";
import { useDispatch, useSelector } from "react-redux";
import gif from '../../User/assets/speech-bubble.gif'




function NavbarVendor({refresh}) {

const navigate = useNavigate()
const vendor = useSelector((state) => state.vendor)
const dispatch= useDispatch()
console.log("kkjj",vendor);

useEffect( ()=>{
  if(!vendor.id ||refresh || !refresh){
    authVendor().then((response) => {
      console.log(response.data);
      if (response.data.status) {
        dispatch(
          setVendorDetails({
            name: response.data.vendor.vendorName,
            id: response.data.vendor._id,
            email: response.data.vendor.email, 
            mobile : response.data.vendor.mobile,
          })
        );
      }
    })
  }
},[refresh])

  return (
    <>
    <div className=" navbar shadow-xl bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
            <Link to={'/vendor/home/'}>Home</Link> 
            </li>
            <li>
            <Link to={'/vendor/resorts/'}>Resorts</Link> 
            </li>
            <li>
          <Link to={'/vendor/vendorHistory/'}>Bookings</Link> 
          </li>           
          </ul>
        </div>
        <Link to={'/vendor/home/'}>
        <p className="normal-case font-semibold text-lg text-green-800 cursor-pointer sm:text-xl">Shaj Paradise</p></Link> 
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
          <Link to={'/vendor/home/'}>Home</Link> 
          </li>
          <li>
          <Link to={'/vendor/resorts/'}>Resorts</Link> 
          </li>
          <li>
          <Link to={'/vendor/vendorHistory/'}>Bookings</Link> 
          </li>
        </ul>
      </div>
      {
          vendor.id && vendor.id ?
          <div className="navbar-end">
           <Link to='/vendor/vendorChat' state={vendor.id} ><button className="self-end"><img style={{height:'38px',width:'38px'}} src={gif} alt="" /></button></Link>
            <div className="dropdown ml-6 dropdown-end mr-4">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://source.unsplash.com/100x100/?portrait" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to={'/vendor/vendorProfile'}>
                  <p className="justify-between">
                    Profile
                  </p></Link>
                </li>
                <li><Link to={'/vendor/vendorHistory/'}><a>History</a></Link></li>
                <li onClick={
                  () => {
                    localStorage.removeItem('VendorJwtKey');
                    navigate('/vendor/login')
                    dispatch(setVendorSignout())  
                  }}><a>Logout</a></li>
              </ul>
            </div>
          </div>
            :
      <div className="navbar-end">
        <Link to={'/vendor/login'}><a className="btn">Log in</a></Link> 
      </div>
}
    </div>
    </>
  );
}


export default NavbarVendor
