import React from "react";
import Banner from "./Banner/Banner";
import { Navbar } from "./Navbar/Navbar";
import BannerTwo from "./BannerTwo/BannerTwo"

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
