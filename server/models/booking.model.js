import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
    startDate: {
      type: String,
      require: true,
    },
    endDate: {
      type: String,
      require: true,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
