// // import connectToDatabase from '../utils/db.js';
// // import Item from '../models/Item.js';
// // import mongoose from 'mongoose';

// // export default async function handler(req, res) {
// //   if (req.method !== 'GET') {
// //     return res.status(405).json({ msg: 'Method not allowed' });
// //   }

// //   const { id } = req.query;

// //   if (!mongoose.Types.ObjectId.isValid(id)) {
// //     return res.status(400).json({ msg: 'Invalid item ID format' });
// //   }

// //   try {
// //     await connectToDatabase();

// //     const item = await Item.findById(id).lean(); // lean() returns plain JS object

// //     if (!item) {
// //       return res.status(404).json({ msg: 'Item not found' });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       data: item
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).json({ success: false, msg: 'Server error' });
// //   }
// // }
// // This file should be located at /api/items/[id].js
// import connectToDatabase from '../../server/utils/db.js';
// import Item from '../../server/models/Item.js';
// import mongoose from 'mongoose';

// export default async function handler(req, res) {
//   // Set CORS headers for all responses
//   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

//   // Handle preflight OPTIONS request
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }
  
//   if (req.method !== 'GET') {
//     return res.status(405).json({ msg: 'Method not allowed' });
//   }

//   const { id } = req.query;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ msg: 'Invalid item ID format' });
//   }

//   try {
//     await connectToDatabase();

//     const item = await Item.findById(id).lean(); // lean() returns plain JS object

//     if (!item) {
//       return res.status(404).json({ success: false, msg: 'Item not found' });
//     }

//     return res.status(200).json({
//       success: true,
//       data: item
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, msg: 'Server error' });
//   }
// }
// This file should be located at /api/items/[id].js
import connectToDatabase from '../../server/utils/db.js';
import Item from '../../server/models/Item.js';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  console.log(`Received request with method: ${req.method} and URL: ${req.url}`);
  // Set CORS headers to allow specific methods
  res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Connect to the database
  try {
    await connectToDatabase();
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.status(500).json({ success: false, msg: "Database connection failed." });
  }

  const { id } = req.query;

  // Validate the item ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, msg: 'Invalid item ID format' });
  }

  // Handle GET request to fetch a single item
  if (req.method === 'GET') {
    try {
      const item = await Item.findById(id).lean();

      if (!item) {
        return res.status(404).json({ success: false, msg: 'Item not found' });
      }

      return res.status(200).json({ success: true, data: item });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, msg: 'Server error' });
    }
  }

  // Handle PUT request to update an item
  else if (req.method === 'PUT') {
    const { name, category, count, shortDescription, instructions } = req.body;

    // Perform basic validation on the updated data
    if (!name || !category || isNaN(count)) {
      return res.status(400).json({ success: false, msg: "Missing or invalid required fields." });
    }
    
    try {
      // Find the item by ID and update it
      const updatedItem = await Item.findByIdAndUpdate(
        id,
        { name, category, count, shortDescription, instructions },
        { new: true, runValidators: true } // new: returns the updated document; runValidators: ensures data integrity
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

  // Handle DELETE request to delete an item
  else if (req.method === 'DELETE') {
    try {
      const deletedItem = await Item.findByIdAndDelete(id);

      if (!deletedItem) {
        return res.status(404).json({ success: false, msg: "Item not found." });
      }

      return res.status(200).json({ success: true, msg: "Item deleted successfully." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, msg: 'Server error' });
    }
  }

  // For any other method, return a 405
  else {
    return res.status(405).json({ success: false, msg: `Method ${req.method} Not Allowed` });
  }
}
