import { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWishList } from "../redux/state";

const ListingCard = ({
  creator,
  listingId,
  category,
  type,
  province,
  city,
  country,
  listingphotoPaths,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  const navigate = useNavigate();
  /* slider for the image */
  const [currentIndex, setCurrentIndex] = useState(0);

  const getToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingphotoPaths.length);
  };

  const getToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingphotoPaths.length) % listingphotoPaths.length
    );
  };

  /* Add to wish list */

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const wishList = user?.wishList || [];

  const isLiked = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const response = await fetch(
        `http://localhost:3001/users/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    } else {
      return;
    }
  };

  return (
    <>
      <div
        className="listing-card"
        onClick={() => navigate(`/properties/${listingId}`)}
      >
        <div className="slider-container">
          <div
            className="slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {listingphotoPaths.map((path, index) => (
              <div className="slide" key={index}>
                <img
                  src={`http://localhost:3001/${path?.replace("public", "")}`}
                  alt={`path ${index + 1}`}
                />
                <div
                  className="prev-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    getToPrevSlide(e);
                  }}
                >
                  <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                </div>
                <div
                  className="next-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    getToNextSlide(e);
                  }}
                >
                  <ArrowForwardIos sx={{ fontSize: "15px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <h3>
          {" "}
          {city}, {province}, {country}{" "}
        </h3>
        <p> {category} </p>

        {!booking ? (
          <>
            <p> {type} </p>
            <p>
              <span>${price}</span> per night
            </p>
          </>
        ) : (
          <>
            <p>
              {" "}
              {startDate} - {endDate}{" "}
            </p>
            <p>
              <span>${totalPrice}</span> total{" "}
            </p>
          </>
        )}

        <button
          className="favorite"
          onClick={(e) => {
            e.stopPropagation();
            patchWishList();
          }}
          disabled={!user}
        >
          {isLiked ? (
            <Favorite sx={{ color: "red" }} />
          ) : (
            <Favorite sx={{ color: "white" }} />
          )}
        </button>
      </div>
    </>
  );
};

export default ListingCard;
