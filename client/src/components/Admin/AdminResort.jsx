import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";

const AdminResort = () => {
  const [resort, setResort] = useState([]);

  useEffect(() => {
    try {
      (async function () {
        const { data } = await axios.get("/admin/resort");
        if (data.success) {
          setResort(data.resort);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Sidebar />

      <section className=" bg-blueGray-50 py-8 ml-18">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative px-10 py-10 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Resorts
                  </h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto ml-10">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Id
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Resort name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Description
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Amenities
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Place
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {resort.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {item.resortName}
                        </td>
                        <td ><p className="w-56 overflow-hidden text-ellipsis whitespace-nowrap border-t-0 px-6 align-center border-l-0 border-r-0 text-xs p-4">
                          {item.description} </p>
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.amenities}
                        </td>
                        <td><p className="w-32 overflow-hidden text-ellipsis whitespace-nowrap border-t-0 px-6 align-center border-l-0 border-r-0 text-xs p-4">
                          {item.place} </p>
                        </td>
                       
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminResort;
