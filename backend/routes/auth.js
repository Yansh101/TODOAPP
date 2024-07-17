// import express from "express";
// import bcrypt from "bcryptjs";
// import User from "../model/user.js";  // Ensure the correct path to the user model

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   try {
//     const { email, username, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already registered" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const newUser = new User({
//       email,
//       username,
//       password: hashedPassword,
//     });

//     // Save user to database
//     await newUser.save();

//     res.status(200).json({ user: newUser });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
