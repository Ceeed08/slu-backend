import connectToDatabase from '../server/utils/db.js';
import User from '../server/models/User.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    
    // Find all users and explicitly exclude the 'password' field.
    const users = await User.find().select('-password');

    return res.status(200).json({ users });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
}