// // // // import connectToDatabase from '../server/utils/db.js';
// // // // import User from '../server/models/User.js';

// // // // export default async function handler(req, res) {
// // // //   if (req.method !== 'GET') {
// // // //     return res.status(405).json({ msg: 'Method not allowed' });
// // // //   }

// // // //   try {
// // // //     await connectToDatabase();
    
// // // //     // Find all users and explicitly exclude the 'password' field.
// // // //     const users = await User.find().select('-password');

// // // //     return res.status(200).json({ users });

// // // //   } catch (err) {
// // // //     console.error(err.message);
// // // //     return res.status(500).json({ msg: 'Server error' });
// // // //   }
// // // // }
// // // import connectToDatabase from '../utils/db.js';
// // // import User from '../models/User.js';

// // // export default async function handler(req, res) {
// // //   // Log the request to confirm the function is being triggered
// // //   console.log("Received a request to the /api/users endpoint.");

// // //   if (req.method !== 'GET') {
// // //     console.log(`Method not allowed: ${req.method}`);
// // //     return res.status(405).json({ msg: 'Method not allowed' });
// // //   }

// // //   try {
// // //     // Attempt to connect to the database with a log
// // //     console.log("Attempting to connect to the database...");
// // //     await connectToDatabase();
// // //     console.log("Database connection successful.");
    
// // //     // Find all users and explicitly exclude the 'password' field.
// // //     const users = await User.find().select('-password');
    
// // //     // Log the number of users found
// // //     console.log(`Found ${users.length} users.`);

// // //     return res.status(200).json({ users });

// // //   } catch (err) {
// // //     // Log the specific error for debugging
// // //     console.error("An error occurred in the /api/users handler:", err.message);
// // //     return res.status(500).json({ msg: 'Server error' });
// // //   }
// // // }
// // import connectToDatabase from '../utils/db.js';
// // import User from '../models/User.js';

// // export default async function handler(req, res) {
// //   if (req.method !== 'GET') {
// //     return res.status(405).json({ msg: 'Method not allowed' });
// //   }

// //   try {
// //     await connectToDatabase();
    
// //     // Find all users and explicitly exclude the 'password' field.
// //     const users = await User.find().select('-password');
    
// //     return res.status(200).json({ users });

// //   } catch (err) {
// //     // Log the specific error for debugging
// //     console.error("An error occurred in the /api/users handler:", err.message);
// //     return res.status(500).json({ msg: 'Server error' });
// //   }
// // }
// import connectToDatabase from '../utils/db.js';
// import User from '../models/User.js';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ msg: 'Method not allowed' });
//   }

//   // The try/catch block is temporarily removed to expose the full error in the Vercel logs.
//   await connectToDatabase();
  
//   // Find all users and explicitly exclude the 'password' field.
//   const users = await User.find().select('-password');

//   // Log the number of users found to confirm the query succeeded.
//   console.log(`Successfully found ${users.length} users.`);

//   return res.status(200).json({ users });
// }
import connectToDatabase from './utils/db.js';
import User from './models/User.js';

export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // This is the simplified, unauthenticated version for your thesis project.
  // The server will now return data directly without checking for a token.

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
