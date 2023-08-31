import { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import axios from "axios";
import { format } from "date-fns";
import jsPDF from "jspdf"
import "jspdf-autotable"; // Import the autotable plugin

function AdminSalesReport() {
  const [sales, setSales] = useState();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    try {
      (async function () {
        const { data } = await axios.get(`/admin/adminHistory?fromDate=${fromDate}&toDate=${toDate}`);
        console.log(data.history, "jjj");
        if (data.success) {
          setSales(data.history);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [toDate,fromDate]);

  const generatePDF = () => {
    const pdf = new jsPDF();

   if (fromDate && toDate) {
      pdf.text(` Date Range: ${fromDate} to ${toDate}`, 10, 20);
    }

    const startY = fromDate && toDate ? 40 : 30; // Adjust startY based on date range

    pdf.text("sales Report", 10, startY);

    const tableColumnHeaders = [
      " ID",
      "DATE",
      "USER NAME",
      "VENDOR NAME",
      "RESORT NAME",
      "PAYMENT METHOD",
      "AMOUNT",
    ];

    const tableRows = sales.map((item,index) => [
      index+1,
      new Date(item.date).toLocaleDateString(),
      item.user.name,
      item.vendor.vendorName,
      item.resort.resortName,
      item.paymentMethod,
      item.resort.amount,
    ]);

    pdf.autoTable({
      startY:startY+10,
      head: [tableColumnHeaders],
      body: tableRows
    });

    pdf.save("sales_report.pdf");
  };
  return (
    <>
      <Sidebar />

      <section class="py-1 bg-blueGray-50">
        <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div class="relative flex px-10 py-10 flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <div className="flex mt-2 ">
                    <label className="label">
                      <span className="label-text font-semibold">From:</span>
                    </label>
                    <input
                      type="date"
                      value={fromDate}
                      min={minDate}
                    max={toDate}
                      className="mr-4 border-success border-2 rounded-md p-2"
                      onChange={(e) => {
                        setFromDate(e.target.value);
                      }}
                    />
                    <label className="label">
                      <span className="label-text font-semibold">To:</span>
                    </label>
                    <input
                      type="date"                   
                      value={toDate}
                      min={
                        fromDate ? format(new Date(fromDate), "yyyy-MM-dd") : ""
                      }
                     
                      className="mr-4 border-success border-2 rounded-md p-2"
                      onChange={(e) => {
                        setToDate(e.target.value);
                      }}
                      required
                    />
                    <button onClick={generatePDF} className="btn ml-32 btn-neutral btn-sm mt-4">
              Download PDF
            </button>
                  </div>
                  <h3 class="font-semibold text-base mt-4 text-blueGray-700">
                    SalesReport
                  </h3>
                </div>
              </div>
            </div>

            <div class="block w-full overflow-x-auto ml-10">
              <table class="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Id
                    </th>
                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Date
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Vendor name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      resort name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Payment
                    </th>
                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sales &&
                    sales.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            {index + 1}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            {item.user.name}
                          </td>{" "}
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            {item.vendor.vendorName}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                            {item.resort.resortName}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                            {item.paymentMethod}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                            {item.resort.amount}
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
}

export default AdminSalesReport;
