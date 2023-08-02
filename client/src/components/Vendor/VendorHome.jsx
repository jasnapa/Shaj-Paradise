import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import NavbarVendor from './NavbarVendor./NavbarVendor';
import { getVendor } from '../../Services/vendorApi';


function VendorHome (){

	const [vendors, setVendors] = useState([]);

	useEffect(() => {
		try {
		  (async function () {
			const { data } = await getVendor()
			if (data.success) {
			  setVendors(data.vendor);
			}
		  })();
		} catch (error) {
		  console.log(error);
		}
	  },[])
  return (
  <>
    <NavbarVendor />
	{/* <ModalVendor /> */}
    <section className="p-6 text-gray-100">
	<div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
		<div className="w-full card glass flex flex-col justify-center items-center px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 bg-gray-900">
			<span className="block mb-2 text-violet-400"></span>
			<h1 className="text-5xl font-extrabold text-gray-50">{vendors.resortName}</h1>
			<p className="my-8">
				<span className="font-medium text-gray-50">{vendors.description}</span>
			</p>
		</div>
		{vendors.images && vendors.images[0] ? (
            <img
              src={vendors.images[0]}
              alt=""
              className="object-cover w-full rounded-md xl:col-span-3 bg-gray-500"
            />
          ) : (
            <p>Loading images...</p>
          )}
	</div>
</section>
</>
  );
};

export default VendorHome
