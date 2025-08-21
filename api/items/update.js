// import connectToDatabase from '../../server/utils/db.js';
// import Item from '../../server/models/Item.js';
// import mongoose from 'mongoose';

// export default async function handler(req, res) {
//   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, msg: `Method ${req.method} Not Allowed` });
//   }

//   try {
//     await connectToDatabase();
//   } catch (error) {
//     console.error("Database connection failed:", error);
//     return res.status(500).json({ success: false, msg: "Database connection failed." });
//   }

//   // Get all data from the request body
//   const { _id, name, category, count, shortDescription, instructions } = req.body;

//   // Validate the item ID
//   if (!mongoose.Types.ObjectId.isValid(_id)) {
//     return res.status(400).json({ success: false, msg: 'Invalid item ID format' });
//   }

//   // Perform basic validation on the updated data
//   if (!name || !category || isNaN(count)) {
//     return res.status(400).json({ success: false, msg: "Missing or invalid required fields." });
//   }

//   try {
//     const updatedItem = await Item.findByIdAndUpdate(
//       _id, // Use the ID from the request body
//       { name, category, count, shortDescription, instructions },
//       { new: true, runValidators: true }
//     );

//     if (!updatedItem) {
//       return res.status(404).json({ success: false, msg: "Item not found." });
//     }

//     return res.status(200).json({ success: true, data: updatedItem });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, msg: 'Server error' });
//   }
// }

import connectToDatabase from '../../server/utils/db.js';
import Item from '../../server/models/Item.js';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  // Set CORS headers for all responses, regardless of method
  res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

  // Handle preflight OPTIONS request immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Ensure the request is a POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, msg: `Method ${req.method} Not Allowed` });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Get the item data from the request body
    const { _id, name, category, count, shortDescription, instructions } = req.body;

    // Validate the item ID format
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ success: false, msg: 'Invalid item ID format' });
    }

    // Perform basic validation on the updated data
    if (!name || !category || isNaN(count)) {
      return res.status(400).json({ success: false, msg: "Missing or invalid required fields." });
    }
    
    // Find the item by ID and update it
    const updatedItem = await Item.findByIdAndUpdate(
      _id,
      { name, category, count, shortDescription, instructions },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, msg: "Item not found." });
    }

    return res.status(200).json({ success: true, data: updatedItem });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
}