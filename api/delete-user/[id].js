import connectToDatabase from '../utils/db.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// Define the email that should NEVER be deleted
const ADMIN_USER_EMAIL_TO_EXCLUDE = "admin@super";

export default async function handler(req, res) {
    // Set CORS headers for all responses, regardless of method
    res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'DELETE') {
        return res.status(405).json({ success: false, msg: `Method ${req.method} Not Allowed` });
    }

    try {
        await connectToDatabase();

        const { id } = req.query;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, msg: 'Invalid user ID format' });
        }

        // STEP 1: Find the user by ID to check their email
        const userToDelete = await User.findById(id);

        if (!userToDelete) {
            return res.status(404).json({ success: false, msg: "User not found." });
        }

        // **CRITICAL SECURITY CHECK:** Stop deletion if the email matches the excluded admin
        if (userToDelete.email.toLowerCase() === ADMIN_USER_EMAIL_TO_EXCLUDE.toLowerCase()) {
            return res.status(403).json({ success: false, msg: "Deletion of the core admin user is forbidden." });
        }

        // STEP 2: Delete the user
        const deletedUser = await User.findByIdAndDelete(id);

        return res.status(200).json({ success: true, msg: "User deleted successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, msg: 'Server error' });
    }
}