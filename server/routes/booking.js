import Booking from "../models/booking.model.js";
import { Router } from "express";

const router = Router();

router.post("/create", async (req, res) => {
  try {
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
    res.status(200).json(newBooking);
  } catch (error) {
    res
      .status(409)
      .json({ message: "failed to create booking", error: error.message });
    console.log(error);
  }
});

export default router;
