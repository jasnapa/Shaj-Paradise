import ModalVendor from "./Modal/ModalVendor";
import NavbarVendor from "./NavbarVendor./NavbarVendor";
import { useEffect, useState } from "react";
import { viewResorts } from "../../Services/vendorApi";
import EditModal from "./EditResortModal/EditResortModal";

function VendorResorts() {
  const [resorts, setResort] = useState([]);
  const [refresh,setRefresh] = useState(false)

  useEffect(() => {
    try {
      (async function () {
        const { data } = await viewResorts();
        if (data.success) {
          setResort(data.resorts);
          console.log(resorts);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  return (
    <>
      <NavbarVendor />
      <div className="mt-8">
        <ModalVendor refresh ={refresh} setRefresh={setRefresh}/>
      </div>
      {resorts.map((item, index) => {
        return (
          <div key={index} className="inline-block shadow-xl  ml-16 mt-10">
            <div className=" card w-52  shadow-xl">
              <figure className="w-fit h-40">
                <img src={item.images[0]} alt="car!" className="h-full" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.resortName}</h2>
                <p className="font-bold">Rs.{item.amount}</p>
                {item.verify ? (
                  <div className=" badge badge-success text-white font-semibold p-2 text-xs">Verified</div>
                ) : (
                  <div className=" badge badge-warning text-white font-semibold p-2 text-xs">Waiting for Update</div>
                )}
                <div className="card-actions justify-end">
                  <EditModal editMode={true} refresh={refresh} setRefresh={setRefresh} resort={item} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default VendorResorts;
