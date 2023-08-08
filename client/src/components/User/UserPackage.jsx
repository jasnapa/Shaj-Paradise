import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar/Navbar";

function UserPackage() {
  const [packages, setPackages] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    try {
      (async function () {
        const { data } = await axios.get("/packages/" + id);
        console.log(data.packages);
        if (data.success) {
          setPackages(data.packages);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Navbar />
      {
       packages.map((item) => {
        return (
        <Link to ={"/viewResorts"} state={{ data: item }}>
          <div className="inline-block ml-10 mt-10">
            <div className="card w-52 glass">
            {item.resort.images && item.resort.images[0] ? (
              <figure className="w-fit h-40">
                <img src={item.resort.images[0]} alt="car!" />
              </figure>
              ) : (
                <p>Loading images...</p>
              )}
              <div className="card-body">
                <h2 className="card-title">{item.amount}</h2>
                <p>{item.daysInfo}</p>
                <div className="card-actions justify-end">
                  {/* <button className="btn btn-primary">Learn now!</button> */}
                </div>
              </div>
            </div>
          </div>
        </Link>
        );
      })}
    </>
  );
}

export default UserPackage;
