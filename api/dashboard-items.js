import connectToDatabase from '../../server/utils/db.js';
import Item from '../../server/models/Item.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    // 1. Count unique items (pages)
    // Assuming each unique 'name' represents a unique item.
    const uniqueItemsCount = await Item.distinct('name').countDocuments();

    // 2. Count total number of items
    const totalItemsCount = await Item.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$count' }
        }
      }
    ]);
    const totalCount = totalItemsCount.length > 0 ? totalItemsCount[0].total : 0;

    // 3. Count active pages
    // You'll need to add an 'isActive' field to your ItemSchema.
    // For now, let's assume 'isActive' is a new boolean field.
    const activePagesCount = await Item.countDocuments({ isActive: true });

    // 4. Count inactive pages
    const inactivePagesCount = await Item.countDocuments({ isActive: false });

    return res.status(200).json({
      success: true,
      data: {
        uniqueItemsCount,
        totalItemsCount: totalCount,
        activePagesCount,
        inactivePagesCount,
      },
    });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
}