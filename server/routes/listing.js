import { Listing } from "../models/index.model.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";

const router = Router();

// create listing
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    // information from the form
    const {
      creator,
      category,
      type,
      streetAdress,
      aptSuite,
      province,
      city,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      desc,
      highlight,
      highlightDetails,
      price,
    } = req.body;

    const listingPhotos = req.files;
    if (!listingPhotos) {
      return res.status(400).json("No file uploaded");
    }
    const listingphotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAdress,
      aptSuite,
      province,
      city,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingphotoPaths,
      title,
      desc,
      highlight,
      highlightDetails,
      price,
    });

    await newListing.save();

    res.status(200).json(newListing);
  } catch (error) {
    res
      .status(409)
      .json({ message: "failed to create Listing", error: error.message });
    console.log(error);
  }
});

/* Get listing by category */
router.get("/", async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

/* Get  listing by search */
router.get("/search/:search", async (req, res) => {
  try {
    const { search } = req.params;
    let listings = [];
    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    res.status(200).json(listings);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Listing could not be found", error: error.message });
    console.log(error);
  }
});

/* mistakenly overwritting the listing because of not using the else part  */
// router.get("/", async (req, res) => {
//   const qCategory = req.query.category;

//   try {
//     let listing;
//     if (qCategory) {
//       listing = await Listing.findOne({ category: qCategory }).populate("creator")
//     }
//     listing = await Listing.find().populate("creator")
//     res.status(200).json(listing);
//   } catch (error) {
//     res
//       .status(404)
//       .json({ message: "failed to fetch Listing", error: error.message })
//       console.log(error)
//   }
// });

/* Listing Details */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(202).json(listing);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Listing could not be found", error: error.message });
  }
});

export default router;
