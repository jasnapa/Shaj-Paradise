import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "../../../Services/userApi";
import { setUserDetails, setUserSignout } from "../../../redux/Features/userSlice";


function Navbar() {

const navigate = useNavigate()
const users = useSelector((state) => state.user)
const dispatch= useDispatch()
console.log("kkjj",users);
useEffect( ()=>{

  if(!users.id){
    authUser().then((response) => {

      if (response.data.status) {
        dispatch(
          setUserDetails({
            name: response.data.user.name,
            id: response.data.user._id,
            email: response.data.user.email,
            mobile: response.data.user.mobile,
          })
        );
      }
    })
  }
})

  return (
    <>
    <div className="z-0 navbar shadow-xl  bg-transparent ">
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
            <Link to={'/'}><a > Home</a></Link> 
            </li>
            <li>
            <Link to={'/resorts'}><a > Resorts</a></Link> 
            </li>
            <li>
              <p>History</p>
            </li>
          </ul>
        </div>
        <p className="btn btn-ghost normal-case text-xl">Shaj Paradise</p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
          <Link to={'/'}><a > Home</a></Link> 
          </li>
          <li>
          <Link to={'/resorts'}><a > Resorts</a></Link> 
          </li>
          <li>
            <a>History</a>
          </li>
        </ul>
      </div>
      {
          users.id && users.id ?
          <div className="navbar-end">
            <div className="dropdown dropdown-end mr-4">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://source.unsplash.com/100x100/?portrait" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to={'/profile'}>
                  <p className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </p></Link>
                </li>
                <li><Link to={'/history'}><a>History</a></Link></li>
                <li onClick={
                  () => {
                    localStorage.removeItem('UserJwtKey');
                    navigate('/')
                    dispatch(setUserSignout())  
                  }}><a>Logout</a></li>
              </ul>
            </div>
          </div>
            :
      <div className="navbar-end">
        <Link to={'/login'}><a className="btn btn-sm btn-accent text-white mr-8">Log in</a></Link> 
      </div>
}
    </div>
    </>

  );
}


export default Navbar