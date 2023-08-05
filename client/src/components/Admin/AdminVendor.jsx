import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Modal from "./Modal/Modal";
import Swal from "sweetalert2";

const AdminVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    try {
      (async function () {
        const { data } = await axios.get("/admin/vendors");
        if (data.success) {
          setVendors(data.vendors);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [reload]);

  async function blockVendor(values) {
    Swal.fire({
      title: "Are you sure? Block",
      text: "Block this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7e3af2",
      cancelButtonColor: "##a8a8a8",
      confirmButtonText: "Yes, Block!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.patch("/admin/blockVendor", { ...values });
        setReload(!reload);
      }
    });
  }

  async function unblockVendor(values) {
    Swal.fire({
      title: "Are you sure? Unblock",
      text: "Unblock this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7e3af2",
      cancelButtonColor: "##a8a8a8",
      confirmButtonText: "Yes, Unblock!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.patch("/admin/unblockVendor", {
          ...values,
        });
        setReload(!reload);
      }
    });
  }

  async function approveVendor(values) {
    Swal.fire({
      title: "Are you sure? Approve",
      text: "Approve this vendor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7e3af2",
      cancelButtonColor: "##a8a8a8",
      confirmButtonText: "Yes, Approve!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.patch("/admin/approveVendor", {
          ...values,
        });
        setReload(!reload);
      }
    });
  }

  return (
    <>
      <Sidebar />

      <section class="py-1 bg-blueGray-50">
        <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div class="relative flex px-10 py-10 flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-blueGray-700">
                    Vendors
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
                      Name
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Contact
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Status
                    </th>
                    <th class="px-4 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Manage
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {vendors.map((item, index) => {
                    return (
                      <tr>
                        <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td class="border-t-0 px-6  border-l-0 border-r-0 text-xs whitespace-nowrap py-3 ">
                          {item.vendorName}
                        </td>
                        <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap py-3">
                          {item.email}
                        </td>
                        <td class="border-t-0 px- text-center border-l-0 border-r-0 text-xs whitespace-nowrap py-3">
                          {item.mobile}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3">
                          <i className="fas fa-arrow-up text-emerald-500 mr-2"></i>
                          {item.blocked == true ? "Blocked" : "Active"}
                        </td>
                        <td>
                          {item.approve ? (
                            item.blocked ? (
                              <button
                                onClick={() => unblockVendor(item)}
                                type="button"
                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-2 py-1 mt-2 text-center mr-2 mb-2"
                              >
                                Unblock
                              </button>
                            ) : (
                              <button
                                onClick={() => blockVendor(item)}
                                type="button"
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-md text-sm px-2 py-1 text-center mr-3 ml-3 mt-2 mb-2"
                              >
                                Block
                              </button>
                            )
                          ) : (
                            <button
                              onClick={() => approveVendor(item)}
                              type="button"
                              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-2 py-1 mt-2 text-center mr-2 mb-2"
                            >
                              Approve
                            </button>
                          )}
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
export default AdminVendor;
