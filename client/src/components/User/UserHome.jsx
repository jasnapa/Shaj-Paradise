import React from "react";
import Banner from "./Banner/Banner";
import BannerTwo from "./BannerTwo/BannerTwo"
import Navbar from "./Navbar/Navbar";
import UserResort from "./UserResort";
import Testimonials from "./Testimonial/Testimonial";
import Footer from "./Footer/Footer";
import PlaceCart from "./PlaceCart/PlaceCart";

const UserHome = () => {
  return (
    <div>
    <Navbar />
    <div>
    <Navbar />
     <Banner />
     <PlaceCart />
     <Testimonials />
     <BannerTwo />
     <Footer />
    </div>
  );
};

export default UserHome;
