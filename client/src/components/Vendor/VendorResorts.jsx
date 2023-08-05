import ModalVendor from "./Modal/ModalVendor";
import NavbarVendor from "./NavbarVendor./NavbarVendor";
import resort from ".././User/assets/resort1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { viewResorts } from "../../Services/vendorApi";

function VendorResorts() {
  const [resorts, setResort] = useState([]);

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
  }, []);

  return (
    <>
      <NavbarVendor />
      <div className="mt-8">
        <ModalVendor />
      </div>
      {resorts.map((item, index) => {
        return (
          <div key={index} className="inline-block shadow-xl ml-16 mt-10">
            <div className=" card w-52 shadow-xl">
              <figure className="w-fit h-40">
                <img src={item.images[0]} alt="car!" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.resortName}</h2>
                <p className="font-bold">Rs.{item.amount}</p>
                <div className="card-actions justify-end">
                  {/* <button className="btn btn-primary">Learn now!</button> */}
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
