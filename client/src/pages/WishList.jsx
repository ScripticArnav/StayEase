import React from "react";
import "../styles/List.scss";
import { useSelector } from "react-redux";
import { Footer, ListingCard, Navbar } from "../components";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);
  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList?.map(
          ({
            _id,
            creator,
            listingphotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
            creator={creator}
              listingId={_id}
              country={country}
              city={city}
              province={province}
              category={category}
              type={type}
              price={price}
              booking={booking}
              listingphotoPaths={listingphotoPaths}
            />
          )
        )}
      </div>
      <Footer/>
    </>
  );
};

export default WishList;
