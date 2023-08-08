import React from "react";
import Banner from "./Banner/Banner";
import BannerTwo from "./BannerTwo/BannerTwo"
import Navbar from "./Navbar/Navbar";

const UserHome = () => {
  return (
    <div>
    <Navbar />
     <Banner />
     <BannerTwo />
    </div>
  );
};

export default UserHome;
