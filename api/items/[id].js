// // api/items/[id].js
// import connectToDatabase from '../../server/utils/db.js';
// import Item from '../../server/models/Item.js';
// import mongoose from 'mongoose';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ msg: 'Method not allowed' });
//   }

//   const { id } = req.query;

//   // Validate ID format
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ msg: 'Invalid item ID format' });
//   }

//   try {
//     await connectToDatabase();

//     // Find item by _id
//     const item = await Item.findById(id);

//     if (!item) {
//       return res.status(404).json({ msg: 'Item not found' });
//     }

//     return res.status(200).json(item);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// }
import connectToDatabase from '../utils/db.js';
import Item from '../models/Item.js';
import mongoose from 'mongoose';

export default async function handler(req, res) {
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
      return res.status(404).json({ msg: 'Item not found' });
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
