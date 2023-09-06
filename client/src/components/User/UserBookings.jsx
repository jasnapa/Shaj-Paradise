import React, { useEffect, useState } from "react";
import { bookingHistory } from "../../Services/userApi";
import Navbar from "./Navbar/Navbar";
import ResortBanner from "./ResortBanner/ResortBanner";
import { Link, useNavigate } from "react-router-dom";
import { createChat } from "../../Services/chatApi";
import { useSelector } from "react-redux";

function Booking() {
  const [booking, setBooking] = useState([]);
  const user = useSelector((state)=>{
    return state.user
  })
  const navigate = useNavigate()
  const userId = user.id

  useEffect(() => {
    try {
      (async function () {
        const { data } = await bookingHistory()
        if (data.success) {
          // setBooking(data.booking);     
          setBooking(data.booking.reverse());

        }
      })();
    } catch (error) {
      console.log(error);
    }
  },[]);

  const handleChat = async(vendorId)=>{
    try {
      const { data } = await createChat(
        vendorId,
        userId
      )
      if (data.status) {
        navigate('/Chat',{ state: userId });
      } else {
        console.log(data.err);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <ResortBanner place={"Bookings"} />
      {booking &&
      booking.map((item, index) => (
        <div className="flex justify-center mb-8 mt-8">
          <div className="card lg:w-3/4 lg:h-48 mb-5 lg:card-side bg-base-100 shadow-xl">
            <figure>
              <img className="h-full w-52 " src={item?.resort.images[0]} alt="Album" />
            </figure>
            <div className="card-body">
              <p className="card-title">{item?.resort.resortName}</p>
              <p className="max-h-6 overflow-hidden text-ellipsis">{item?.resort.description}</p>
              <div className="flex">
              <p className="text-neutral-focus ">Check in : {new Date(item?.checkin).toLocaleDateString()} </p> 
              <p className="text-neutral-focus ">Check Out : { new Date(item?.checkout).toLocaleDateString()}</p> 
              </div>
              <div>

              <p className="btn btn-xs ml-4 btn-success badge-success text-white">{item?.paymentMethod}</p>

           <button onClick={()=>handleChat(item.vendor._id)} className="btn btn-xs ml-4 btn-success badge-success text-white">Chat</button>  
              </div>
            </div>
            
            <div className="flex justify-center pr-8 items-center">
                <span className="text-xl font-mono italic font-semibold text-success">
                  Rs.{item?.totalAmount}
                </span>
              </div>
            
          </div>
        </div>
      ))}
    </>
  );
}

export default Booking;
