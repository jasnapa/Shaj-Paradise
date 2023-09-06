import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "../Navbar/Navbar";
import {
  ResortAvailability,
  booking,
  getBookedDates,
  userOnlinePay,
  verifyPayment,
} from "../../../Services/userApi";
import { toast } from "react-toastify";

function ResortView() {
  const location = useLocation();
  const { data } = location.state;
  const resort = data._id;
  const vendor = data.vendor
  const [image, setImage] = useState(1);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [PersonCount, setSelectedPersonCount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState();
  const [disabledDates, setDisabledDates] = useState([]);
  const [minDate, setMinDate] = useState('');
  const [bookedDates, setBookedDates] = useState([]);
  const [totalAmount, setTotalAmount] = useState(data.amount)
  const navigate = useNavigate();
  const handleImageChange = (i) => {
    setImage(i);
  }

 


  useEffect(() => {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    setMinDate(formattedCurrentDate);

    const fetchBookedDates = async () => {
      try {
        const { data } = await getBookedDates(resort); // Replace with your API call
        if (data.success) {
          
          const formattedBookedDates = data.bookedDates.map((booking) => {
            const from = new Date(booking.checkin);
            const to = new Date(booking.checkout);

            return {
              from: from.toISOString().split("T")[0],
              to: to.toISOString().split("T")[0],
            };
          });

          setBookedDates(formattedBookedDates);
          setDisabledDates(formattedBookedDates);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookedDates();
  }, [resort]);

  const handlePersonChange = (e) => {
    const selectedCount = parseInt(e.target.value);
    if (selectedCount > 5) {
      const additionalPersons = selectedCount - 5;
      setTotalAmount(data.amount + additionalPersons * 1000);
    } else {
      setTotalAmount(data.amount);
    }
    setSelectedPersonCount(selectedCount);
  }
  
  // const disableBookedDates = (bookedDates) => {
  //   const disabledDates = bookedDates.map((date) => {
  //     const fromDate = new Date(date.checkin);
  //     const toDate = new Date(date.checkout);
  
  //     return {
  //       from: fromDate.toISOString().split("T")[0],
  //       to: toDate.toISOString().split("T")[0],
  //     };
  //   });
  
  //   return disabledDates;
  // };
 


  async function handleSubmit() {

    const { data } = await ResortAvailability(fromDate, toDate, resort);

    if (!data.success) {
      toast.error(data.message, {
        position: "top-center",
      });
    } 
     else if (fromDate == null || toDate == null || paymentMethod == null) {
        toast.error("Please fill all fields", {
          position: "top-center",
        });
      } else if (new Date(toDate) < new Date(fromDate)) {
        toast.error("Please select correct date", {
          position: "top-center",
        });
      }

      else if (paymentMethod == "Online") {
      const {
        data: { order },
      } = await userOnlinePay(totalAmount);
      var options = {
        key: "rzp_test_X2EWEu9JQG1E2R",
        amount: order.amount,
        currency: "INR",
        name: "Shaj Paradise",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async (response) => {
          try {
            await payment(response);
            console.log(response);
          } catch (error) {
            console.error(error);
          }
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } else if (paymentMethod == "Cash") {
      const { data } = await booking(
        resort,
        totalAmount,
        vendor,
        fromDate,
        toDate,
        PersonCount,
        paymentMethod
      );
      if (data.status) {
        //
        navigate("/successCash");
      } else {
        toast.error(data.message, {
          position: "top-center",
        });
      }
    }
  
  }

  const payment = async (response) => {
    try {
      const { data } = await verifyPayment(response);
      console.log(data);
      let orderId = data.order_id;
      if (data.success) {
        const { data } = await booking(
          resort,
          totalAmount,
          vendor,
          fromDate,
          toDate,
          PersonCount,
          paymentMethod,
          orderId
        );
        // toast.success(data.message, {
        //     position: "top-center",
        //   });
        navigate("/success");
      } else {
        toast.error(data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div>
              <div className="h-64 md:h-80 mt-32  shadow-lg rounded-lg bg-gray-100 mb-4">
                {
                  <div
                    className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ${
                      image === 1 ? "" : "hidden"
                    }`}
                  >
                    <img
                      className="card h-fit"
                      src={data.images[0]}
                      alt="Image 1"
                    />
                  </div>
                }

                <div
                  className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ${
                    image === 2 ? "" : "hidden"
                  }`}
                >
                  <img
                    className="card h-fit"
                    src={data.images[1]}
                    alt="Image 2"
                  />
                </div>

                <div
                  className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ${
                    image === 3 ? "" : "hidden"
                  }`}
                >
                  <img className="card" src={data.images[2]} alt="Image 3" />
                </div>

                <div
                  className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ${
                    image === 4 ? "" : "hidden"
                  }`}
                >
                  <img src={data.images[1]} alt="Image 4" />
                </div>
              </div>

              <div className="flex -mx-2 mt-12 mb-4">
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
                      <img src={item} className="z-50 card h-30" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:flex-1 mt-20 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
              {data.resortName}
            </h2>
            <p className="text-gray-500 text-sm">
              {" "}
              <a href="#" className="text-green-700 hover:underline">
                {data.place}
              </a>
            </p>

            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-green-700 mr-1 mt-1">$</span>
                  <span className="font-bold text-green-700 text-3xl">
                    {totalAmount}
                  </span>
                </div>
              </div>
              {/* <div className="flex-1">
                <p className="text-green-500 text-xl font-semibold">Save 12%</p>
                <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
              </div> */}
            </div>

            <p className="text-gray-500">{data.description}</p>
            <div className="flex ">
              <div className="mr-20">
                <p className="text-black mt-5">Total Capacity</p>
                <p className="text-gray-500">{data.capacity}</p>
              </div>
              <div>
                <p className="text-black mt-5">Amenities</p>
                <ul className="">
                  {data.amenities.map((item, index) => {
                    return (
                      <li>
                        {index + 1}. {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* // <p className="text-gray-500">{data.amenities}</p> */}

            <div className="flex-col flex  py-4 space-x-4">
              <div className="flex ">
                <div className="form-control mr-8 mt-4 w-40 max-w-xs">
                  <select
                    className="select select-bordered"
                    value={PersonCount}
                    onChange={(e) => handlePersonChange(e)}
                    required
                  >
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
                    min={minDate}
                    max={toDate}
                    // disabled={disabledDates.some((date) => {
                    //   return date.from <= fromDate && date.to >= fromDate;
                    // })}
                    onChange={(e) => {
                      setFromDate(e.target.value);
                      setToDate(e.target.value);
                      
                    }}
                  />
                  <label className="label">
                    <span className="label-text">To:</span>
                  </label>
                  <input
                    type="date"
                    min={
                      fromDate ? format(new Date(fromDate), "yyyy-MM-dd") : ""
                    }
                    value={toDate}
                    max={
                      disabledDates.length > 0
                        ? disabledDates[disabledDates.length - 1].from
                        : ''
                    }
                    
                    onChange={(e) => setToDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="join mt-6">
                <input
                  className="join-item btn btn-sm hover:bg-green-700"
                  type="radio"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={() => setPaymentMethod("Online")}
                  name="options"
                  aria-label="Online"
                  required
                />
                <input
                  className="join-item btn btn-sm hover:bg-green-700"
                  type="radio"
                  value="Cash"
                  checked={paymentMethod === "Cash"}
                  onChange={() => setPaymentMethod("Cash")}
                  name="options"
                  aria-label="Cash"
                  required
                />
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="mt-8 h-14 px-6 py-2 font-semibold rounded-xl bg-green-700 hover:bg-green-900 text-white"
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
