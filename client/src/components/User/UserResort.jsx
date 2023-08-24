import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Search from "./Search/Search";
import ResortBanner from "./ResortBanner/ResortBanner";
 
function UserResort() {
  const getlocation = useLocation();
  const userLatitude = getlocation?.state?.data[1];
  const userLongitude = getlocation?.state?.data[0];
  const selectedPlace = getlocation?.state?.data?.place
  const [resorts, setResorts] = useState([]);
  const [selectedResorts, setSelected] = useState([]);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState();
  const [limit, setLimit] = useState(5);

  
  useEffect(() => {
    try {
      (async function () {
        const { data } = await axios.get(
          `/resorts?page=${page}&sort=${sort}&filter=${filter}&search=${search}`
        );

        let filteredResorts = data.resorts.filter((resort) =>
          resort.place.toLowerCase().includes(selectedPlace)
        );
        setSelected(filteredResorts);
        

        if (data.success) {
          setTotal(data.total);
          setPage(data.page);

          if (userLatitude && userLongitude) {
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

            const nearbyResorts = resortsWithDistances.filter(
              (resort) => resort.distance <= 10
            );
            // Sort resorts based on distance (nearest to farthest)
            nearbyResorts.sort((a, b) => a.distance - b.distance);

            // Set the sorted resorts to the state
            setResorts(nearbyResorts);
          } else {
            setResorts(data.resorts);
          }
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [userLatitude, userLongitude, sort, filter, page, search]);
  console.log(selectedResorts);

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

  return (
    <>
      <div>
        <Navbar />
      </div>
      <Search setSearch={(search) => setSearch(search)} />

      <ResortBanner place={selectedPlace} />
 
      <div className="flex mt-8 flex-wrap ">
        <div className="flex flex-col">
        <div className="ml-5">
          <label tabIndex={0} className=" b shadow-xl m-1">
            Sort
          </label>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <button onClick={() => setSort("amount")}>Amount</button>
            </li>
            <li>
              <button onClick={() => setSort("resortName")}>Name</button>
            </li>
          </ul>
        </div>
        <div className="ml-5 mt-12">
          <label tabIndex={0} className="shadow-xl m-1">
            Filter
          </label>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <button onClick={() => setFilter("GreaterThan5000")}>Greater than Rs.5000</button>
            </li>
            <li>
              <button onClick={() => setFilter("LessThan5000")}>less than Rs.5000</button>
            </li>
          </ul>
        </div>
        
        </div>
        
        <div className="flex flex-wrap w-3/4 justify-start mt-4">
          <div className="flex mt-10 flex-wrap  ml-16 justify-start">
            {selectedResorts.length > 0
              ? selectedResorts.map((item, index) => (
                  <Link
                    key={index}
                    to={"/viewResorts/"}
                    state={{ data: item }}
                    className="ml-4 mt-4"
                  >
                    <div className="card w-52 mb-6 h-80 shadow-xl">
                      <figure className="w-fit max-h-48">
                        <img
                          src={item.images[0]}
                          alt="car!"
                          className="max-h-48"
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title uppercase">
                          {item.resortName}
                        </h2>
                        <p className="font-mono font-semibold">
                          Rs.{item.amount}
                        </p>
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
                ))
              : resorts.map((item, index) => (
                  <Link
                    key={index}
                    to={"/viewResorts/"}
                    state={{ data: item }}
                    className="ml-4 mt-4"
                  >
                    <div className="card w-52 mb-6 h-80 shadow-xl">
                      <figure className="w-fit max-h-48">
                        <img
                          src={item.images[0]}
                          alt="car!"
                          className="max-h-48"
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title uppercase">
                          {item.resortName}
                        </h2>
                        <p className="font-mono font-semibold">
                          Rs.{item.amount}
                        </p>
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
        </div>
        <div className="w-full self-end ">
          <Footer />
        </div>
      </div>
      {/* <Paginations
        page={page}
        limit={limit ? limit : 0}
        total={total ? total : 0}
        setPage={(page) => setPage(page)}
      /> */}
    </>
  );
}

export default UserResort;
