import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.model.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("NO file uploaded");
    }

    const profileImagePath = profileImage.path;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      profileImagePath,
    });

    await newUser.save();

    res
      .status(200)
      .json({ message: "User registetered Successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Registetered Failed", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    /* taking the Information from the login page */
    const { email, password } = req.body;

    /* Check if the user exists */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    /* Compare the passwords with the hash password we stored in the database */

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    /* Generate JWT token */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.password

    res.status(200).json({token, user})
  } catch (err) {
    console.log(err)
    res.status(400).json({error: err.message})
  }
});

export default router;
