import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import Booking from "../models/booking.model";

const createBooking = asyncHandler(async (req, res) => {
  const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
    req.body;
  const newBooking = new Booking({
    customerId,
    hostId,
    listingId,
    startDate,
    endDate,
    totalPrice,
  });
  await newBooking.save();
});
