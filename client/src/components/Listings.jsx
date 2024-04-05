import { useDispatch, useSelector } from "react-redux";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { setListing } from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:3001/properties?category=${selectedCategory}`
          : "http://localhost:3001/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data)
      dispatch(setListing({ listings: data }));
      setLoading(false);
    } catch (error) {
      console.log("Fetch Listing Failed", error.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  return (
    <>
      <div className="category-list">
        {categories.map((category, index) => (
          <div
            className={`category ${category.label === selectedCategory ? "selected" : ""}`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              creator,
              _id,
              category,
              type,
              province,
              city,
              country,
              listingphotoPaths,
              price,
              booking = false,
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingphotoPaths={listingphotoPaths}
                city={city}
                province={province}
                price={price}
                country={country}
                booking={booking}
                type={type}
                category={category}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
