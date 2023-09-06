import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { adminHistory } from "../../Services/adminApi";

function AdminHistory() {
  const [history, setHistory] = useState([]);
  const [sort, setSort] = useState();
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [limit, setLimit] = useState(5);console.log(page);
  useEffect(() => {
    try {
      (async function () {
        const { data } = await adminHistory(page, limit);
        console.log(data, "jjj");
        if (data.success) {
          setHistory(data.history);
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
      <Sidebar />

      <section className=" bg-blueGray-50 py-8 ml-18">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
            <div className="relative px-10 py-10 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                    Booking
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
                      Payment
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      UserName
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Resort
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Amount
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      CheckIn
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      CheckOut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => {
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
}
export default AdminHistory;
