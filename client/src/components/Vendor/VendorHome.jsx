import React from "react";
import { useEffect, useState } from "react";
import { Home } from "../../Services/vendorApi";
import NavbarVendor from "./NavbarVendor./NavbarVendor";

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
			<div className="carousel max-h-screen md:carousel-center carousel-vertical rounded-box">
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

export default VendorHome
