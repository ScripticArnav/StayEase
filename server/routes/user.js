import { Router } from "express";
import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

const router = Router();

/* Get Trip list */
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(trips);
  } catch (error) {
    res
      .status(409)
      .json({ message: "can not find the trips", error: error.message });
    console.log(error);
  }
});

/* Add lIsting to the wishlist */
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params
    const user = await User.findById(userId)
    const listing = await Listing.findById(listingId).populate("creator");
    console.log(user)
    const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId)

    if (favoriteListing) {
      user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
      await user.save()
      res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList})
    } else {
      user.wishList.push(listing)
      await user.save()
      res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList})
    }
  } catch (err) {
    console.log("could not do it sorry ", err)
    res.status(404).json({ error: err.message })
  }
})

/* Get Property List */
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(202).json(properties);
  } catch (error) {
    res
      .status(409)
      .json({ message: "can not find properties", error: error.message });
    console.log(error);
  }
});

/* Get Reservation List */
router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId")
    res.status(202).json(reservations);
  } catch (error) {
    res
      .status(409)
      .json({ message: "can not find reservations", error: error.message });
    console.log(error);
  }
});
export default router;