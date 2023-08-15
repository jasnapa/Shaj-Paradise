import React, { useEffect, useState } from "react";
import resort1 from "../User/assets/resort111.jpg";
import { bookingHistory } from "../../Services/userApi";
import Navbar from "./Navbar/Navbar";

const Booking = () => {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    try {
      (async function () {
        const { data } = await bookingHistory();
        console.log(data);
        if (data.success) {
          setBooking(data.booking);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
    <Navbar />
      {booking.map((item, index) => (
        <div className="mb-10">
        <div className="card w-3/4 h-40 mb-5 lg:card-side bg-base-100 shadow-xl">
          <figure className=" w-52">
            <img className="h-full" src={item.resort.images[0]} alt="Album" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.resort.resortName}</h2>
            <p>{item.resort.description}</p>
            <p>{item.date}</p>
            <div className="flex h-fi justify-end items-center">
              <button className="btn btn-primary">{item.resort.amount}</button>
            </div>
          </div>
        </div>
        </div>
      ))}
    </>
  );
};

export default Booking;
