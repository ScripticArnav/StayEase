import { useEffect, useState } from "react";
import { baseUrl } from "../../url";
import "../styles/List.scss";
import { Footer, ListingCard, Loader, Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);
  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const res = await fetch(`${baseUrl}/users/${userId}/reservations`, {
        method: "GET",
      });

      const data = await res.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (error) {
      console.log("Fetch Reservation List Failed", error.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list ">Your Reservation List</h1>
      <div className="list ">
        {reservationList?.map(
          ({ listingId, startDate, endDate, hostId, totalPrice, booking = true }) => (
            <ListingCard key={listingId._id}
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

export default ReservationList;
