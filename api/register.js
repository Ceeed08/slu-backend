import connectDB from "./utils/db.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

// This is a simple API, so we don't need formidable or special config.
// Vercel's default body parser works perfectly for JSON payloads.
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  // Set CORS headers for security and to allow requests from your frontend.
  res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests for this endpoint
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Connect to the database
    await connectDB();

    const { firstName, lastName, email, password } = req.body;

    // Basic server-side validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check if the user already exists in the database
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User with this email already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      isAdmin: false, // Default role for a new user
      isSuperAdmin: false // Default role for a new user
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;

    // Save the new user to the database
    await newUser.save();

    // Respond with success message and the new user data (excluding the password)
    const savedUser = newUser.toObject();
    delete savedUser.password;

    res.status(201).json({
      success: true,
      data: savedUser,
      message: "User registered successfully!"
    });

  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
      error: error.message
    });
  }
}