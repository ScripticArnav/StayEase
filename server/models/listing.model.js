import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    streetAddress: {
      type: String,
      require: true,
    },
    aptSuite: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    province: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    guestCount: {
      type: Number,
      require: true,
    },
    bedroomCount: {
      type: Number,
      require: true,
    },
    bedCount: {
      type: Number,
      require: true,
    },
    bathroomCount: {
      type: Number,
      require: true,
    },
    amenities: {
      type: Array,
      default: [],
    },
    listingphotoPaths: [{ type: String }],
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    highlight: {
      type: String,
      required: true,
    },
    highlightDetails: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
