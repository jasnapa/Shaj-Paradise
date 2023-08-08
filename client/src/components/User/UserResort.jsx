import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function UserResort() {
  const getlocation = useLocation();
  const userLatitude = getlocation?.state?.data[1];
  const userLongitude = getlocation?.state?.data[0];
  const [resorts, setResorts] = useState([]);


  useEffect(() => {

    try {
      (async function () {
        const { data } = await axios.get("/resorts");
        console.log(data.resorts);
        if (data.success) {

          if(userLatitude && userLongitude){
          // Calculate distances for each resort using the Haversine formula
          const resortsWithDistances = data.resorts.map((resort) => {
            const distance = calculateDistance(
              userLatitude,
              userLongitude,
              resort.locations[1], // Resort latitude
              resort.locations[0] // Resort longitude
            );
            return { ...resort, distance };
          });
          console.log(resortsWithDistances, "dsgytguygd");

          const nearbyResorts = resortsWithDistances.filter(
            (resort) => resort.distance <= 10
          );
          // Sort resorts based on distance (nearest to farthest)
          nearbyResorts.sort((a, b) => a.distance - b.distance);

          // Set the sorted resorts to the state
          setResorts(nearbyResorts);
        }else{
          setResorts(data.resorts)
        }
      }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [userLatitude, userLongitude]);

  // Haversine formula implementation
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance;
  }

  const chunkSize = 5;
  const resortChunks = [];
  for (let i = 0; i < resorts.length; i += chunkSize) {
    resortChunks.push(resorts.slice(i, i + chunkSize));
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-start ml-16 ">
        {resortChunks.map((chunk, index) => (
          <div key={index} className="flex flex-wrap justify-center">
            {chunk.map((item) => (
              <Link
                key={item._id}
                to={"/viewResorts/"}
                state={{ data: item }}
                className="ml-4 mt-4"
              >
                <div className="card w-52 h-80 shadow-xl">
                  <figure className="w-fit h-48">
                    <img src={item.images[0]} alt="car!" className="h-full"/>
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title uppercase">{item.resortName}</h2>
                    <p className="font-mono font-semibold">Rs.{item.amount}</p>
                    <p className="max-h-5 overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.place}
                    </p>
                    {item.distance ? (
                      <p>Distance: {item.distance.toFixed(2)} km</p>
                    ) : (
                      ""
                    )}
                    <div className="card-actions justify-end">
                      {/* <button className="btn btn-primary">Learn now!</button> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default UserResort;
