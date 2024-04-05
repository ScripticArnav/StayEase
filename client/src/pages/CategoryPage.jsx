import { useEffect, useState } from "react";
import "../styles/List.scss";
import { Footer, ListingCard, Loader, Navbar } from "../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListing } from "../redux/state";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const {category} = useParams()
  const dispatch = useDispatch()
  
  const listings = useSelector(state => state.listings)

  const getFeedListings = async () => {
    try {
      const response = await fetch(
          `http://localhost:3001/properties?category=${category}`,
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
    getFeedListings()
  }, [category])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{category} Listings</h1>
      <div className="list">
        {listings?.map(
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

export default CategoryPage;
