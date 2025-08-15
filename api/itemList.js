// import connectToDatabase from '../../../server/utils/db.js';
// import Item from '../../../server/models/Item.js';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       await connectToDatabase();

//       // Fetch all items
//       const items = await Item.find();

//       // Return as plain objects
//       const plainItems = items.map(item => item.toObject());

//       return res.status(200).json(plainItems);

//     } catch (err) {
//       console.error(err.message);
//       return res.status(500).json({ msg: 'Server error' });
//     }
//   } else {
//     return res.status(405).json({ msg: 'Method not allowed' });
//   }
// }
// api/items/itemList.js

// import connectToDatabase from '../../server/utils/db.js';
// import Item from '../../server/models/Item.js';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ msg: 'Method not allowed' });
//   }

//   try {
//     // Connect to DB (cached in serverless environment)
//     await connectToDatabase();

//     // Fetch all items
//     const items = await Item.find().lean(); // lean() returns plain JS objects

//     // Return the items
//     return res.status(200).json(items);
//   } catch (err) {
//     console.error('❌ Error fetching items:', err.message || err);
//     return res.status(500).json({ msg: 'Internal server error' });
//   }
// }

// api/items/itemList.js
import connectToDatabase from '../server/utils/db.js';
import Item from '../server/models/Item.js';

export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    // Connect to DB (cached in serverless environment)
    await connectToDatabase();

    // Fetch all items
    const items = await Item.find().lean(); // lean() returns plain JS objects

    // Return the items
    return res.status(200).json(items);
  } catch (err) {
    console.error('❌ Error fetching items:', err.message || err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}
