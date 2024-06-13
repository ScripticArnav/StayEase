import { useEffect, useState } from "react";
import { baseUrl } from "../../url";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ListingDetails.scss";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { Footer, Loader, Navbar } from "../components";
import { useSelector } from "react-redux";

const ListingDetail = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState({});

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `${baseUrl}properties/${listingId}`,
        { method: "GET" }
      );
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (error) {
      console.log("Fetch Listing Details failed", error.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);
  // Booking calender

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  /* submit booking */
  const navigate = useNavigate();
  const customerId = useSelector((state) => state?.user?._id);

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };
      const res = await fetch(`${baseUrl}/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (res.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Submit booking failed", err.message);
    }
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="listing-details">
            <div className="title">
              <h1>{listing.title}</h1>
              <div></div>
            </div>
            <div className="photos">
              {listing.listingphotoPaths?.map((photo) => (
                <img
                  src={`${baseUrl}/${photo.replace("public", "")}`}
                  alt=""
                />
              ))}
            </div>
            <h2>
              {listing.type} in {listing.city}, {listing.province},{" "}
              {listing.country}
            </h2>
            <p>
              {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
              {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
            </p>
            <hr />

            <div className="profile">
              <img
                src={`${baseUrl}/${listing.creator.profileImagePath.replace(
                  "public",
                  ""
                )}`}
              />
              <h3>
                Hosted by {listing.creator.firstName} {listing.creator.lastName}
              </h3>
            </div>
            <hr />
            <h3>Description</h3>
            <p>{listing.desc}</p>
            <hr />
            <h3>{listing.highlight}</h3>
            <p>{listing.highlightDetails}</p>
            <hr />

            <div className="booking">
              <div>
                <h2>What this place offer?</h2>
                <div className="amenities">
                  {listing.amenities[0].split(",").map((item, index) => (
                    <div className="facility" key={index}>
                      <div className="facility_icon">
                        {
                          facilities.find((facility) => facility.name === item)
                            ?.icon
                        }
                      </div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2>How long do you want to stay?</h2>
                <div className="date-range-calender">
                  <DateRange ranges={dateRange} onChange={handleSelect} />
                  {dayCount > 1 ? (
                    <h2>
                      ${listing.price} X {dayCount} nights
                    </h2>
                  ) : (
                    <h2>
                      ${listing.price} X {dayCount} nights
                    </h2>
                  )}

                  <h2>Total Price: ${listing.price * dayCount}</h2>
                  <p>Start Date: {dateRange[0].startDate.toString()}</p>
                  <p>End Date: {dateRange[0].endDate.toString()}</p>

                  <button
                    className="button"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    BOOKING
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </>
      )}
      ;
    </>
  );
};

export default ListingDetail;
