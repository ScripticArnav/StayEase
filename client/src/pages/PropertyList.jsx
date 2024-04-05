import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import { Footer, ListingCard, Loader, Navbar } from "../components";
import { setPropertyList } from "../redux/state";

const PropertyList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = useSelector((state) => state.user.propertyList);

  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${user._id}/properties`,
        { method: "GET" }
      );
      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (error) {
      console.log("fetch all properties failed", error.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList?.map(
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

export default PropertyList;
