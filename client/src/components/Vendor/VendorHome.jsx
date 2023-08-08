import React from "react";
import { useEffect, useState } from "react";
import NavbarVendor from "./NavbarVendor./NavbarVendor";
import { Home } from "../../Services/vendorApi";

function VendorHome() {
  const [resorts, setResort] = useState([]);

  useEffect(() => {
    try {
      (async function () {
        const { data } = await Home();
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
      {/* <ModalVendor /> */}
      
			<div className="carousel max-h-screen rounded-box">
      {resorts.map((item, index) => {
        return (
			<div className="carousel-item w-full">
			  <img src={item.images[0]} className="w-full" alt="Burger" />
     
			</div>
         );
        })}
          </div>
     
    </>
  );
}

export default VendorHome;
