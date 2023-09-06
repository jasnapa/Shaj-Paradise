import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { useLocation } from "react-router-dom";





function AdminViewVendor(){
    const [resort, setResorts] = useState([]);

    const location = useLocation();
  const { data } = location.state;
const vendor= data._id
    useEffect(() => {
        try {
          (async function () {
            const { data } = await axios.post("/admin/viewVendors",{vendor});
            console.log(data,'ytftf');
            if (data.success) {
              setResorts(data.resort);
            }
          })();
        } catch (error) {
          console.log(error);
        }
      }, []);
    return(
        <>
        <Sidebar />

      <section class="py-1 bg-blueGray-50">
        <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div class="relative flex px-10 py-10 flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-blueGray-700">
                    {data.vendorName}
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
                      Resort names
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Description
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Locations
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {resort.map((item, index) => {
                    return (
                      <tr>
                            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap py-3">
                          {item.resortName}
                        </td>
                        <td> <p class="w-56 overflow-hidden text-ellipsis whitespace-nowrap border-t-0 border-l-0 border-r-0 text-xs">
                          {item.description}</p>
                        </td>
                        <td> <p class="w-28 overflow-hidden text-ellipsis whitespace-nowrap border-t-0 border-l-0 border-r-0 text-xs py-3">
                          {item.place}</p>
                        </td>

                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
        </>
  
    )
}

export default AdminViewVendor