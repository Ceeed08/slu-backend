// // // // import connectToDatabase from '../utils/db.js';
// // // // import User from '../models/User.js';
// // // // import mongoose from 'mongoose';

// // // // export default async function handler(req, res) {
// // // //   // Set CORS headers for all responses, regardless of method
// // // //   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
// // // //   res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
// // // //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

// // // //   // Handle preflight OPTIONS request immediately
// // // //   if (req.method === 'OPTIONS') {
// // // //     return res.status(200).end();
// // // //   }

// // // //   // The EditUserForm uses a PUT request, so we should handle that method.
// // // //   if (req.method !== 'PUT') {
// // // //     return res.status(405).json({ success: false, msg: `Method ${req.method} Not Allowed` });
// // // //   }

// // // //   try {
// // // //     // Connect to the database
// // // //     await connectToDatabase();

// // // //     // The user ID comes from the URL parameter in a PUT request
// // // //     const { id } = req.query;

// // // //     // Get the updated user data from the request body
// // // //     const { firstName, lastName, email } = req.body;
    
// // // //     // Validate the user ID format
// // // //     if (!mongoose.Types.ObjectId.isValid(id)) {
// // // //       return res.status(400).json({ success: false, msg: 'Invalid user ID format' });
// // // //     }

// // // //     // Perform basic validation on the updated data
// // // //     if (!firstName || !lastName || !email) {
// // // //       return res.status(400).json({ success: false, msg: "Missing required fields." });
// // // //     }

// // // //     // Find the user by ID and update the fields
// // // //     const updatedUser = await User.findByIdAndUpdate(
// // // //       id,
// // // //       { firstName, lastName, email },
// // // //       { new: true, runValidators: true } // `new: true` returns the updated document
// // // //     );

// // // //     if (!updatedUser) {
// // // //       return res.status(404).json({ success: false, msg: "User not found." });
// // // //     }

// // // //     return res.status(200).json({ success: true, data: updatedUser });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     // You can add more specific error handling here, e.g., for duplicate email
// // // //     return res.status(500).json({ success: false, msg: 'Server error' });
// // // //   }
// // // // }
// // // // src/api/update-user/[userId].js or similar route file
// // // import connectToDatabase from '../utils/db.js';
// // // import User from '../models/User.js';

// // // export default async function handler(req, res) {
// // //   // Set CORS headers for all responses
// // //   res.setHeader('Access-Control-Allow-Origin', '*');
// // //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
// // //   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

// // //   // Handle preflight OPTIONS request
// // //   if (req.method === 'OPTIONS') {
// // //     return res.status(200).end();
// // //   }
  
// // //   if (req.method !== 'PUT') {
// // //     return res.status(405).json({ msg: 'Method not allowed' });
// // //   }

// // //   const { userId } = req.query; // Assuming your route is dynamic, like /api/update-user/[userId]
// // //   const { firstName, lastName, email } = req.body;

// // //   if (!userId) {
// // //     return res.status(400).json({ msg: 'User ID is required' });
// // //   }

// // //   try {
// // //     await connectToDatabase();
    
// // //     const updatedUser = await User.findByIdAndUpdate(
// // //       userId,
// // //       { firstName, lastName, email },
// // //       { new: true }
// // //     ).select('-password');

// // //     if (!updatedUser) {
// // //       return res.status(404).json({ msg: 'User not found' });
// // //     }

// // //     return res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
// // //   } catch (err) {
// // //     console.error(err.message);
// // //     return res.status(500).json({ msg: 'Server error' });
// // //   }
// // // }
// // import connectToDatabase from '../utils/db.js';
// // import User from '../models/User.js';

// // export default async function handler(req, res) {
// //   // Set specific CORS headers to match your working updateItem route
// //   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
// //   res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
// //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

// //   // Handle preflight OPTIONS request immediately
// //   if (req.method === 'OPTIONS') {
// //     return res.status(200).end();
// //   }

// //   // Ensure the request is a PUT
// //   if (req.method !== 'PUT') {
// //     return res.status(405).json({ msg: `Method ${req.method} Not Allowed` });
// //   }

// //   const { userId } = req.query; // Assuming your route is dynamic, like /api/update-user/[userId]
// //   const { firstName, lastName, email } = req.body;

// //   if (!userId) {
// //     return res.status(400).json({ msg: 'User ID is required' });
// //   }

// //   try {
// //     await connectToDatabase();
    
// //     const updatedUser = await User.findByIdAndUpdate(
// //       userId,
// //       { firstName, lastName, email },
// //       { new: true, runValidators: true }
// //     ).select('-password');

// //     if (!updatedUser) {
// //       return res.status(404).json({ msg: 'User not found' });
// //     }

// //     return res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
// //   } catch (err) {
// //     console.error(err.message);
// //     return res.status(500).json({ msg: 'Server error' });
// //   }
// // }

// import connectToDatabase from '../utils/db.js';
// import User from '../models/User.js';

// export default async function handler(req, res) {
//   // Set specific CORS headers
//   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

//   // Handle preflight OPTIONS request
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   // Now, we expect a POST request, just like your working updateItem route
//   if (req.method !== 'POST') {
//     return res.status(405).json({ msg: `Method ${req.method} Not Allowed` });
//   }

//   const { userId } = req.query; // Assuming your route is dynamic, like /api/update-user/[userId]
//   const { firstName, lastName, email } = req.body;

//   if (!userId) {
//     return res.status(400).json({ msg: 'User ID is required' });
//   }

//   try {
//     await connectToDatabase();
    
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { firstName, lastName, email },
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!updatedUser) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     return res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// }
import connectToDatabase from '../utils/db.js';
import User from '../models/User.js';

export default async function handler(req, res) {
  // Set specific CORS headers. This is a failsafe but the vercel.json is the source of truth.
  res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

  // Handle preflight OPTIONS request with an early return
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Ensure the request is a POST
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: `Method ${req.method} Not Allowed` });
  }

  const { userId } = req.query; // Assuming your route is dynamic, like /api/update-user/[userId]
  const { firstName, lastName, email } = req.body;

  if (!userId) {
    return res.status(400).json({ msg: 'User ID is required' });
  }

  try {
    await connectToDatabase();
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    return res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
}
