// // // // api/auth.js
// // // import connectToDatabase from '../server/utils/db.js';
// // // import User from '../server/models/User.js';
// // // import bcrypt from 'bcryptjs';

// // // export default async function handler(req, res) {
// // //   if (req.method !== 'POST') {
// // //     return res.status(405).json({ msg: 'Method not allowed' });
// // //   }

// // //   const { email, password } = req.body;

// // //   // Validate input
// // //   if (!email || !password) {
// // //     return res.status(400).json({ msg: 'Please enter all fields' });
// // //   }

// // //   try {
// // //     await connectToDatabase();

// // //     // Check if user exists
// // //     const user = await User.findOne({ email });
// // //     console.log("user", user);
// // //     if (!user) {
// // //       return res.status(400).json({ msg: 'Invalid credentials' });
// // //     }

// // //     // Compare password
// // //     const isMatch = await bcrypt.compare(password, user.password);
// // //     if (!isMatch) {
// // //       return res.status(400).json({ msg: 'Invalid credentials' });
// // //     }

// // //     //converts returned record as plain object
// // //     const userPlain = user.toObject();

// // //     const userDetails = {
// // //       email: userPlain.email,
// // //       firstName: userPlain.firstName,
// // //       lastName: userPlain.lastName,
// // //       address: userPlain.address,
// // //       contactNumber: userPlain.contactNumber
// // //     };
// // //     // Success
// // //     return res.status(200).json({ msg: 'Login successful', user: userDetails });

// // //   } catch (err) {
// // //     console.error(err.message);
// // //     return res.status(500).json({ msg: 'Server error' });
// // //   }
// // // }
// // // api/auth.js
// // // import connectToDatabase from '../server/utils/db.js';
// // // import User from '../server/models/User.js';
// // // import bcrypt from 'bcryptjs';

// // // export default async (req, res) => {
// // //   // Handle the preflight OPTIONS request first
// // //   if (req.method === 'OPTIONS') {
// // //     res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
// // //     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
// // //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
// // //     return res.status(200).end();
// // //   }

// // //   // Set the Access-Control-Allow-Origin header for all other requests as well
// // //   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');

// // //   if (req.method !== 'POST') {
// // //     return res.status(405).json({ msg: 'Method not allowed' });
// // //   }

// // //   const { email, password } = req.body;

// // //   // Validate input
// // //   if (!email || !password) {
// // //     return res.status(400).json({ msg: 'Please enter all fields' });
// // //   }

// // //   try {
// // //     await connectToDatabase();

// // //     // Check if user exists
// // //     const user = await User.findOne({ email });
// // //     console.log("user", user);
// // //     if (!user) {
// // //       return res.status(400).json({ msg: 'Invalid credentials' });
// // //     }

// // //     // Compare password
// // //     const isMatch = await bcrypt.compare(password, user.password);
// // //     if (!isMatch) {
// // //       return res.status(400).json({ msg: 'Invalid credentials' });
// // //     }

// // //     //converts returned record as plain object
// // //     const userPlain = user.toObject();

// // //     const userDetails = {
// // //       email: userPlain.email,
// // //       firstName: userPlain.firstName,
// // //       lastName: userPlain.lastName,
// // //       address: userPlain.address,
// // //       contactNumber: userPlain.contactNumber
// // //     };
// // //     // Success
// // //     return res.status(200).json({ msg: 'Login successful', user: userDetails });

// // //   } catch (err) {
// // //     console.error(err.message);
// // //     return res.status(500).json({ msg: 'Server error' });
// // //   }
// // // };
// // // api/auth.js
// // import connectToDatabase from '../server/utils/db.js';
// // import User from '../server/models/User.js';
// // import bcrypt from 'bcryptjs';

// // export default async function handler(req, res) {
// //   if (req.method !== 'POST') {
// //     return res.status(405).json({ msg: 'Method not allowed' });
// //   }

// //   const { email, password } = req.body;

// //   // Validate input
// //   if (!email || !password) {
// //     return res.status(400).json({ msg: 'Please enter all fields' });
// //   }

// //   try {
// //     await connectToDatabase();

// //     // Check if user exists
// //     const user = await User.findOne({ email });
// //     console.log("user", user);
// //     if (!user) {
// //       return res.status(400).json({ msg: 'Invalid credentials' });
// //     }

// //     // Compare password
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ msg: 'Invalid credentials' });
// //     }

// //     //converts returned record as plain object
// //     const userPlain = user.toObject();

// //     const userDetails = {
// //       email: userPlain.email,
// //       firstName: userPlain.firstName,
// //       lastName: userPlain.lastName,
// //       address: userPlain.address,
// //       contactNumber: userPlain.contactNumber
// //     };
// //     // Success
// //     return res.status(200).json({ msg: 'Login successful', user: userDetails });

// //   } catch (err) {
// //     console.error(err.message);
// //     return res.status(500).json({ msg: 'Server error' });
// //   }
// // }
// // api/auth.js
// import connectToDatabase from './utils/db.js';
// import User from './models/User.js';
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//   // Set CORS headers for all responses
//   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

//   // Handle preflight OPTIONS reques
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   if (req.method !== 'POST') {
//     return res.status(405).json({ msg: 'Method not allowed' });
//   }

//   const { email, password } = req.body;

//   // Validate input
//   if (!email || !password) {
//     return res.status(400).json({ msg: 'Please enter all fields' });
//   }

//   try {
//     await connectToDatabase();

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const userPlain = user.toObject();

//     const userDetails = {
//       email: userPlain.email,
//       firstName: userPlain.firstName,
//       lastName: userPlain.lastName,
//       address: userPlain.address,
//       contactNumber: userPlain.contactNumber
//     };
//     // Success
//     return res.status(200).json({ msg: 'Login successful', user: userDetails });

//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// // }
// import connectToDatabase from './utils/db.js';
// import User from './models/User.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// export default async function handler(req, res) {
//   // Set CORS headers for all responses
//   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

//   // Handle preflight OPTIONS request
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   if (req.method !== 'POST') {
//     return res.status(405).json({ msg: 'Method not allowed' });
//   }

//   const { email, password } = req.body;

//   // Validate input
//   if (!email || !password) {
//     return res.status(400).json({ msg: 'Please enter all fields' });
//   }

//   try {
//     await connectToDatabase();

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Create a payload for the JWT
//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     // Sign the token with a secret key
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET, // Make sure you have this in your Vercel environment variables
//       { expiresIn: '1h' }, // Token expires in 1 hour
//       (err, token) => {
//         if (err) throw err;
        
//         const userPlain = user.toObject();
        
//         // Return the token along with the user details
//         return res.status(200).json({
//           msg: 'Login successful',
//           token,
//           user: {
//             id: userPlain._id,
//             email: userPlain.email,
//             firstName: userPlain.firstName,
//             lastName: userPlain.lastName,
//             address: userPlain.address,
//             contactNumber: userPlain.contactNumber
//           }
//         });
//       }
//     );

//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// }
import connectToDatabase from './utils/db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', 'https://slu-laboratory-resources.engineering');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    await connectToDatabase();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const userPlain = user.toObject();

    const userDetails = {
      _id: userPlain._id,
      email: userPlain.email,
      firstName: userPlain.firstName,
      lastName: userPlain.lastName,
      address: userPlain.address,
      contactNumber: userPlain.contactNumber,
      isAdmin: userPlain.isAdmin,
      isSuperAdmin: userPlain.isSuperAdmin
    };
    // Success
    return res.status(200).json({ msg: 'Login successful', user: userDetails });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
}
