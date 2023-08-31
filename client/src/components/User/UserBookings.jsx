import React, { useEffect, useState } from "react";
import { bookingHistory } from "../../Services/userApi";
import Navbar from "./Navbar/Navbar";
import ResortBanner from "./ResortBanner/ResortBanner";
import { Link } from "react-router-dom";

function Booking() {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    try {
      (async function () {
        const { data } = await bookingHistory()
        console.log(data.booking,"rty");
        if (data.success) {
          // setBooking(data.booking);     
          setBooking(data.booking.reverse());

        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(booking);
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
              <p className="text-green-500 font-semibold">Check in : {new Date(item?.checkin).toLocaleDateString()} </p> 
              <p className="text-red-600 font-semibold">Check Out : { new Date(item?.checkout).toLocaleDateString()}</p> 
              </div>
              <div>

              <p className="badge badge-success text-white">{item?.paymentMethod}</p>       
             <Link to={'/chat'} state={item.user}><button className="btn btn-xs ml-4 btn-success badge-success text-white">Chat</button>     </Link>   
              </div>
            </div>
            
            <div className="flex justify-center pr-8 items-center">
                <span className="text-xl font-mono italic font-semibold text-success">
                  Rs.{item?.resort.amount}
                </span>
              </div>
            
          </div>
        </div>
      ))}
    </>
  );
}

export default Booking;
