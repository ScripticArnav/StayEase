import React from "react";
import { Navbar, Categories, Slide, Listings, Footer } from "../components";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
      <Footer/>
    </>
  );
};

export default HomePage;
