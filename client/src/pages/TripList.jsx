import { useEffect, useState } from "react";
import { baseUrl } from "../../url";
import "../styles/List.scss";
import { Footer, ListingCard, Loader, Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);
  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const res = await fetch(`${baseUrl}/users/${userId}/trips`, {
        method: "GET",
      });

      const data = await res.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (error) {
      console.log("Fetch Trip List Failed", error.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list ">Your Trip List</h1>
      <div className="list ">
        {tripList?.map(
          ({
            listingId,
            hostId,
            startDate,
            endDate,
            totalPrice,
            booking = true,
          }) => (
            <ListingCard
              creator={hostId._id}
              listingId={listingId._id}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              listingphotoPaths={listingId.listingphotoPaths}
              city={listingId.city}
              province={listingId.province}
              country={listingId.country}
              category={listingId.category}
              booking={booking}
            />
          )
        )}
      </div>

    <Footer/>
    </>
  );
};

export default TripList;
