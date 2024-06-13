import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use("/", (req, res) => {
  res.send("Server is Running")
})
/* Routes */
import authRoutes from "./routes/auth.js";
app.use("/auth", authRoutes);

import listingRoutes from "./routes/listing.js";
app.use("/properties", listingRoutes);

import bookingRoutes from "./routes/booking.js";
app.use("/bookings", bookingRoutes);

import userRoutes from "./routes/user.js";
app.use("/users", userRoutes);

/* Mongoose setup */
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "StayEase",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
