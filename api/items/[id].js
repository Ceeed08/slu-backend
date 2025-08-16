// import connectToDatabase from '../utils/db.js';
// import Item from '../models/Item.js';
// import mongoose from 'mongoose';

// export default async function handler(req, res) {
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
//       return res.status(404).json({ msg: 'Item not found' });
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
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid item ID format' });
  }

  try {
    await connectToDatabase();

    const item = await Item.findById(id).lean(); // lean() returns plain JS object

    if (!item) {
      return res.status(404).json({ success: false, msg: 'Item not found' });
    }

    return res.status(200).json({
      success: true,
      data: item
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
}
