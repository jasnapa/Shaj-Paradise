import { useEffect, useState } from "react";
import { Navbar } from "./Navbar/Navbar";
import resort from "./assets/resort1.jpg";
import axios from "axios";
import { Link } from "react-router-dom";


function UserResort() {


  const [vendors, setResorts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
		try {
		  (async function () {
			const { data } = await axios.get("/resorts");
			console.log(data.resorts);
			if (data.success) {
			  setResorts(data.resorts);
			}
		  })();
		} catch (error) {
		  console.log(error);
		}
	  },[])
		
    const handleSearch = async () => {
      try {
        const { data } = await axios.get(`/search`);
        if (data.success) {
          setResorts(data.vendors);
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <Navbar />
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for resorts..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      { 
      vendors.map((item) =>{
        return(
      <Link to ={"/viewResorts/" } state={{ data: item }} >
        <div className="inline-block ml-10 mt-10">
        <div className=" card w-52 glass">
          <figure className="w-fit h-40">
            <img src={item.images[0]} alt="car!" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.resortName}</h2>
            <p>{item.amount}</p>
            <div className="card-actions justify-end">
              {/* <button className="btn btn-primary">Learn now!</button> */}
            </div>
          </div>
        </div>
      </div> 
      </Link>
         )
        })
}
    </>
  );
}

export default UserResort
