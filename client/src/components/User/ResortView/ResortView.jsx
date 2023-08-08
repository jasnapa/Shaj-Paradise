import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "../Navbar/Navbar";
import { booking } from "../../../Services/userApi";
import { toast } from "react-toastify";

const ResortView = () => {
  const [image, setImage] = useState(1);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);3
  const[PersonCount,setSelectedPersonCount] = useState(1)
  const handleImageChange = (i) => {
    setImage(i);
  };
  const location = useLocation();
  const { data } = location.state;

  const resort=data._id

  async function handleSubmit(){

    const {data} = await booking(resort,fromDate,toDate,PersonCount)

    if(data.status){
      toast.success(data.message, {
        position: "top-center"
    })
    }else{
      toast.error(data.message, {
        position: "top-center"
      })
    }
   
  }
  
  

  console.log(data);
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div>
              <div className="h-64 md:h-80 mt-8  rounded-lg bg-gray-100 mb-4">
                {
                  <div
                    className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ${
                      image === 1 ? "" : "hidden"
                    }`}
                  >
                    <img src={data.images[0]} alt="Image 1" />
                  </div>
                }

                <div
                  className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ${
                    image === 2 ? "" : "hidden"
                  }`}
                >
                  <img src={data.images[1]} alt="Image 2" />
                </div>

                <div
                  className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ${
                    image === 3 ? "" : "hidden"
                  }`}
                >
                  <img src={data.images[2]} alt="Image 3" />
                </div>

                <div
                  className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ${
                    image === 4 ? "" : "hidden"
                  }`}
                >
                  <img src={data.images[1]} alt="Image 4" />
                </div>
              </div>

              <div className="flex -mx-2 mb-4">
                {data.images.map((item, index) => (
                  <div key={index} className="flex-1 px-2">
                    <button
                      onClick={() => handleImageChange(index + 1)}
                      className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${
                        image === index + 1
                          ? "ring-2 ring-indigo-300 ring-inset"
                          : ""
                      }`}
                    >
                      <img src={item} className="h-30" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
              {data.resortName}
            </h2>
            <p className="text-gray-500 text-sm">
              {" "}
              <a href="#" className="text-indigo-600 hover:underline">
                {data.place}
              </a>
            </p>

            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-indigo-400 mr-1 mt-1">$</span>
                  <span className="font-bold text-indigo-600 text-3xl">
                    {data.amount}
                  </span>
                </div>
              </div>
              {/* <div className="flex-1">
                <p className="text-green-500 text-xl font-semibold">Save 12%</p>
                <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
              </div> */}
            </div>

            <p className="text-gray-500">{data.description}</p>

            <div className="flex-col py-4 space-x-4">
              <div className="form-control mt-5 w-40 max-w-xs">
                <select className="select select-bordered"
                 value={PersonCount}
                 onChange={(e) => setSelectedPersonCount(parseInt(e.target.value))} required>
                  <option disabled selected>
                    Pick one
                  </option>
                  <option value={1}>one person</option>
                  <option value={2}>two person</option>
                  <option value={3}>three person</option>
                  <option value={4}>four person</option>
                  <option value={5}>five person</option>
                  <option value={6}>six person</option>
                  <option value={7}>seven person</option>
                  <option value={8}>eight person</option>
                  <option value={9}>nine person</option>
                  <option value={10}>ten person</option>
                </select>
              </div>
              <div className="flex mt-6">
                <label className="label">
                  <span className="label-text">From:</span>
                </label>
                <input
                  type="date"
                  className="mr-4"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
                <label className="label">
                  <span className="label-text">To:</span>
                </label>
                <input
                  type="date"
                  min={fromDate ? format(new Date(fromDate), "yyyy-MM-dd") : ""}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <button
              onClick={handleSubmit}
                type="button"
                className="mt-8 h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResortView;
