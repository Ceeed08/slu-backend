import connectToDatabase from '../utils/db.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  // Set CORS headers for all responses, regardless of method
  res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

  // Handle preflight OPTIONS request immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Ensure the request is a DELETE
  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, msg: `Method ${req.method} Not Allowed` });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // The user ID comes from the URL query parameter
    const { id } = req.query;

    // Validate the user ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, msg: 'Invalid user ID format' });
    }

    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(id);

    // If no user is found with that ID, send a 404 response
    if (!deletedUser) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }

    // Send a success response
    return res.status(200).json({ success: true, msg: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
}
