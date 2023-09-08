import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [Locations, setLocation] = useState([]);
  const [suggestions, setSuggest] = useState([]);
  const [value, setValue] = useState("");
  const [place, setPlace] = useState("");
  const [showList, setShowList] = useState(false)
  const navigate = useNavigate()

  const handleRetrieve = (itemLocation, place) => {
    setLocation(itemLocation);
    setPlace(place);
    console.log(Locations);
    
    navigate('/resorts', { state: { data: itemLocation } })
    
  }
  const handleChange = async (e) => {
    setShowList(true)
    setValue(e.target.value);
    console.log(value);

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        value
      )}.json?access_token=pk.eyJ1Ijoic2hhanBhcmFkaXNlLTEyMyIsImEiOiJjbGt3djVieXExYWRyM3BwcDB1eTQ5NjF2In0.qO4fld59j3Og7WhdT6gzHw`
    );
    if (response.ok) {
      const { features } = await response.json();
      setSuggest(features);
      console.log(features);
    }
  };

  return (
    <div>
      <div
        className="absolute ml-14 items-center justify-center w-10/12 flex rounded-full shadow-lg p-2 mt-80"
        style={{ top: "5px" }}
      >
        <input
          onChange={handleChange}
          value={place ? place : value}
          placeholder="Select your Location"
          onFocus={() => setPlace("")}
          className="z-30  input input-ghost placeholder-white font-bold absolute uppercase rounded-full w-full py-4 pl-4 text-base-100 leading-tight lg:text-sm text-xs"
          type="text"
        />
        <ul className=" absolute w-52 mt-60 py-4   " >
        {!place && showList &&
        suggestions.map((item) => {
          return <li  onClick={()=>handleRetrieve(item.geometry.coordinates , item.place_name)} className="text-start bg-white rounded-md pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
              <svg
                className="stroke-current absolute w-4 h-4 left-2 top-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {item.place_name}
            </li>
                })}
          </ul>
    
      </div>
    </div>
  );
};

export default SearchBar;
