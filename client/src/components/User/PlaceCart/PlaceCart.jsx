import { Link } from "react-router-dom";
import resort from "../assets/resort111.jpg";
import resort1 from "../assets/resort23.jpg";
import resort2 from "../assets/resort333.jpg";

function PlaceCart() {
  return (
    <div className="bg-base-100">
      <h2 className="mt-6 text-center text-3xl font-bold text-black sm:text-4xl xl:text-5xl font-pj">
        Your Favourite Destinations
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center md:justify-around">
        <Link to={'/resorts'} state={{ data: { place: 'kodaikanal' } }}>
          <div className="w-full md:w-72 mt-16 mb-16 md:mb-0">
            <figure>
              <img className="rounded-3xl w-full" src={resort} alt="" />
            </figure>
            <p className="text-lg font-bold text-black text-center">KODAIKANAL</p>
          </div>
        </Link>
        <Link to={'/resorts'} state={{ data: { place: 'wayanad' } }}>
          <div className="w-full md:w-72 mt-16 mb-16 md:mb-0">
            <figure>
              <img className="rounded-3xl w-full" src={resort1} alt="" />
            </figure>
            <p className="text-lg font-bold text-black text-center">WAYANAD</p>
          </div>
        </Link>
        <Link to={'/resorts'} state={{ data: { place: 'palakkad' } }}>
          <div className="w-full md:w-72 mt-16 mb-16 md:mb-0">
            <figure>
              <img className="rounded-3xl w-full" src={resort2} alt="" />
            </figure>
            <p className="text-lg font-bold text-black text-center">PALAKKAD</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PlaceCart;
