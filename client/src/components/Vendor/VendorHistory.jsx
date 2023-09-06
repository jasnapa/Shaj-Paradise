import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import NavbarVendor from "./NavbarVendor./NavbarVendor";
import { vendorBooking } from "../../Services/vendorApi";




function VendorHistory() {
const[bookings,setHistory] = useState([])
const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [limit, setLimit] = useState(5);

  useEffect(() => { 
    try {
      (async function () {
        const { data } = await vendorBooking(page, limit);
        console.log(data,"jjj")
        if (data.success) {
          setHistory(data.booking);
          setLimit(data.limit);
          setPage(data.page);
          setTotal(data.total);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [page]);


  return (
    <>
      <NavbarVendor />

      <section class="py-1 bg-blueGray-50">
        <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div class="relative flex px-10 py-10 flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-blueGray-700">
                    Booking
                  </h3>
                </div>
              </div>
            </div>

            <div class="block w-full overflow-x-auto ml-10">
              <table class="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Id
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Payment
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      UserName
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Resort
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Amount
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      CheckIn
                    </th>
                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      CheckOut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                  bookings.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {item.paymentMethod}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {item.user.name}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {item.resort.resortName}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {item.totalAmount}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {new Date(item.checkin).toLocaleDateString()}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {new Date(item.checkout).toLocaleDateString()}
                        </td>
                      
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="ml-28">
            <div className="flex justify-center items-baseline">
              <div className="join">
                {Array.from({ length: Math.ceil(total / limit) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      className={`join-item btn btn-sm btn-white ${
                        page === index + 1 ? "btn-active" : ""
                      }`}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
      </section>
    </>
  );
};
export default VendorHistory;
