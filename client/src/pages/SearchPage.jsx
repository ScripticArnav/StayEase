import { useParams } from "react-router-dom";
import "../styles/List.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListing } from "../redux/state";
import { Footer, ListingCard, Loader, Navbar } from "../components";

const SearchPage = () => {
  const { search } = useParams();
  const [loading, setLoading] = useState(true);
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  const getSearchListings = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/properties/search/${search}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      dispatch(setListing({ listings: data }));
      setLoading(false);
    } catch (error) {
      console.log("fetch search list failed", error.message);
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{search.toUpperCase()}</h1>
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
              creator={creator._id}
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
      <Footer />
    </>
  );
};

export default SearchPage;
