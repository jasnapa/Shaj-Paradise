import { useEffect, useState } from "react";
import { Navbar } from "./Navbar/Navbar";
import resort from "./assets/resort1.jpg";
import axios from "axios";


function UserResort() {


  const [vendors, setResorts] = useState([]);
  useEffect(() => {
		try {
		  (async function () {
			const { data } = await axios.get("/resorts");
			console.log(data.vendors);
			if (data.success) {
			  setResorts(data.vendors);
			}
		  })();
		} catch (error) {
		  console.log(error);
		}
	  },[])
		

  return (
    <>
      <Navbar />
      { 
      vendors.map((item) =>{
        return(
      <div className="inline-block ml-10 mt-10">
        <div className=" card w-52 glass">
          <figure className="w-fit h-40">
            <img src={resort} alt="car!" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.resortName}</h2>
            <p>{item.description}</p>
            <div className="card-actions justify-end">
              {/* <button className="btn btn-primary">Learn now!</button> */}
            </div>
          </div>
        </div>
      </div>
         )
        })
}
    </>
  );
}

export default UserResort
