// // // // This file should be located at /api/items/index.js
// // // import Item from "../../server/models/Item";
// // // import connectDB from "../../server/utils/db.js"; // Corrected path to utils

// // // export default async function handler(req, res) {
// // //   // Set CORS headers for all responses
// // //   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
// // //   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
// // //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

// // //   // Handle preflight OPTIONS request
// // //   if (req.method === 'OPTIONS') {
// // //     return res.status(200).end();
// // //   }

// // //   // Handle POST request to add a new item
// // //   if (req.method !== 'POST') {
// // //     return res.status(405).json({ message: 'Method Not Allowed' });
// // //   }

// // //   try {
// // //     await connectDB();

// // //     const newItemData = req.body;
    
// // //     // Create a new instance of the Item model with the request body data
// // //     const newItem = new Item(newItemData);

// // //     // Save the new item to the database
// // //     await newItem.save();

// // //     // Success: Return the newly created item document
// // //     res.status(201).json(newItem);
// // //   } catch (error) {
// // //     console.error('Error creating new item:', error);
// // //     res.status(500).json({ message: 'Internal Server Error', error: error.message });
// // //   }
// // // }
// // // This file should be located at /api/items/index.js
// // import { IncomingForm } from 'formidable';
// // import path from 'path';

// // // This configuration tells Vercel to disable its default body parser
// // // for this route, allowing 'formidable' to handle the incoming file data.
// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // import Item from "../../server/models/Item";
// // import connectDB from "../../server/utils/db.js";

// // // A mock function to simulate uploading a file to Vercel's Blob or an
// // // external storage service and returning a URL.
// // // In a real-world scenario, you would replace this with
// // // your actual image upload logic using a library like @vercel/blob
// // // or the AWS SDK for S3.
// // const mockUpload = async (file, folder = 'uploads') => {
// //   if (!file) {
// //     return null;
// //   }
  
// //   // This is a placeholder URL. Your real upload function would
// //   // return a URL like 'https://your-storage-bucket.com/images/12345.jpg'
// //   const randomId = Math.random().toString(36).substring(7);
// //   const fileExtension = path.extname(file.originalFilename);
// //   const publicUrl = `https://mock-storage.vercel.app/${folder}/${randomId}${fileExtension}`;
  
// //   console.log(`Mocking upload for file: ${file.originalFilename}. Returning URL: ${publicUrl}`);
  
// //   return publicUrl;
// // };

// // export default async function handler(req, res) {
// //   // Set CORS headers for all responses
// //   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
// //   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
// //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

// //   // Handle preflight OPTIONS request
// //   if (req.method === 'OPTIONS') {
// //     return res.status(200).end();
// //   }

// //   // Handle POST request to add a new item
// //   if (req.method !== 'POST') {
// //     return res.status(405).json({ message: 'Method Not Allowed' });
// //   }

// //   try {
// //     await connectDB();

// //     // Use formidable to parse the multipart/form-data request
// //     const form = new IncomingForm();

// //     const { fields, files } = await new Promise((resolve, reject) => {
// //       form.parse(req, (err, fields, files) => {
// //         if (err) return reject(err);
// //         resolve({ fields, files });
// //       });
// //     });

// //     // 1. Get the URLs by uploading the files
// //     // formidable wraps single files in an array, so we access with `[0]`
// //     const mainImageUrl = await mockUpload(files.mainImage?.[0], 'items');

// //     const thumbnailUrls = [];
// //     if (files.thumbnail0 && files.thumbnail0[0]) {
// //       thumbnailUrls.push(await mockUpload(files.thumbnail0[0], 'thumbnails'));
// //     }
// //     if (files.thumbnail1 && files.thumbnail1[0]) {
// //       thumbnailUrls.push(await mockUpload(files.thumbnail1[0], 'thumbnails'));
// //     }
// //     if (files.thumbnail2 && files.thumbnail2[0]) {
// //       thumbnailUrls.push(await mockUpload(files.thumbnail2[0], 'thumbnails'));
// //     }

// //     // 2. Prepare the data to be saved to MongoDB
// //     // formidable returns fields as arrays, so we must access with `[0]`
// //     const newItemData = {
// //       name: fields.name?.[0],
// //       category: fields.category?.[0],
// //       count: Number(fields.count?.[0]),
// //       image: mainImageUrl, // Assign the URL string
// //       thumbnails: thumbnailUrls, // Assign the array of URL strings
// //       shortDescription: fields.shortDescription?.[0],
// //       instructions: fields.instructions?.[0],
// //     };
    
// //     // 3. Create a new instance of the Item model
// //     const newItem = new Item(newItemData);

// //     // 4. Save the new item to the database
// //     await newItem.save();

// //     // Success: Return the newly created item document
// //     res.status(201).json(newItem);
// //   } catch (error) {
// //     console.error('Error creating new item:', error);
// //     res.status(500).json({ message: 'Internal Server Error', error: error.message });
// //   }
// // }
// // This file should be located at /api/items/index.js
// import { IncomingForm } from 'formidable';
// import path from 'path';

// // This configuration tells Vercel to disable its default body parser
// // for this route, allowing 'formidable' to handle the incoming file data.
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// import Item from "../../server/models/Item";
// import connectDB from "../../server/utils/db.js";

// // A mock function to simulate uploading a file to Vercel's Blob or an
// // external storage service and returning a URL.
// // In a real-world scenario, you would replace this with
// // your actual image upload logic using a library like @vercel/blob
// // or the AWS SDK for S3.
// const mockUpload = async (file, folder = 'uploads') => {
//   if (!file) {
//     return null;
//   }
  
//   // This is a placeholder URL. Your real upload function would
//   // return a URL like 'https://your-storage-bucket.com/images/12345.jpg'
//   const randomId = Math.random().toString(36).substring(7);
//   const fileExtension = path.extname(file.originalFilename);
//   const publicUrl = `https://mock-storage.vercel.app/${folder}/${randomId}${fileExtension}`;
  
//   console.log(`Mocking upload for file: ${file.originalFilename}. Returning URL: ${publicUrl}`);
  
//   return publicUrl;
// };

// export default async function handler(req, res) {
//   // Always set CORS headers, regardless of the request method.
//   // This ensures the preflight OPTIONS request receives the headers it needs.
//   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

//   // Handle preflight OPTIONS request immediately.
//   // The browser sends this before the actual POST request.
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   // From here on, handle only the POST request.
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     await connectDB();

//     // Use formidable to parse the multipart/form-data request
//     const form = new IncomingForm();

//     const { fields, files } = await new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) return reject(err);
//         resolve({ fields, files });
//       });
//     });

//     // 1. Get the URLs by uploading the files
//     const mainImageUrl = await mockUpload(files.mainImage?.[0], 'items');

//     const thumbnailUrls = [];
//     if (files.thumbnail0 && files.thumbnail0[0]) {
//       thumbnailUrls.push(await mockUpload(files.thumbnail0[0], 'thumbnails'));
//     }
//     if (files.thumbnail1 && files.thumbnail1[0]) {
//       thumbnailUrls.push(await mockUpload(files.thumbnail1[0], 'thumbnails'));
//     }
//     if (files.thumbnail2 && files.thumbnail2[0]) {
//       thumbnailUrls.push(await mockUpload(files.thumbnail2[0], 'thumbnails'));
//     }

//     // 2. Prepare the data to be saved to MongoDB
//     const newItemData = {
//       name: fields.name?.[0],
//       category: fields.category?.[0],
//       count: Number(fields.count?.[0]),
//       image: mainImageUrl, // Assign the URL string
//       thumbnails: thumbnailUrls, // Assign the array of URL strings
//       shortDescription: fields.shortDescription?.[0],
//       instructions: fields.instructions?.[0],
//     };
    
//     // 3. Create a new instance of the Item model
//     const newItem = new Item(newItemData);

//     // 4. Save the new item to the database
//     await newItem.save();

//     // Success: Return the newly created item document
//     res.status(201).json(newItem);
//   } catch (error) {
//     console.error('Error creating new item:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// }
// This file should be located at /api/items/index.js
// import { IncomingForm } from 'formidable';
// import path from 'path';

// // This configuration tells Vercel to disable its default body parser
// // for this route, allowing 'formidable' to handle the incoming file data.
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// import Item from "../../server/models/Item";
// import connectDB from "../../server/utils/db.js";

// // A mock function to simulate uploading a file to Vercel's Blob or an
// // external storage service and returning a URL.
// const mockUpload = async (file, folder = 'uploads') => {
//   if (!file || !file.originalFilename) {
//     return null;
//   }
  
//   const randomId = Math.random().toString(36).substring(7);
//   const fileExtension = path.extname(file.originalFilename);
//   const publicUrl = `https://mock-storage.vercel.app/${folder}/${randomId}${fileExtension}`;
  
//   console.log(`Mocking upload for file: ${file.originalFilename}. Returning URL: ${publicUrl}`);
  
//   return publicUrl;
// };

// export default async function handler(req, res) {
//   // Always set CORS headers at the very beginning
//   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

//   // Handle preflight OPTIONS request and return early
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   // Handle POST request to add a new item
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     await connectDB();

//     // Use formidable to parse the multipart/form-data request
//     const form = new IncomingForm();

//     const { fields, files } = await new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) {
//           console.error('Formidable parse error:', err);
//           return reject(err);
//         }
//         resolve({ fields, files });
//       });
//     });

//     // Extract fields and check for existence
//     const name = fields.name?.[0];
//     const category = fields.category?.[0];
//     const count = Number(fields.count?.[0]);
//     const shortDescription = fields.shortDescription?.[0];
//     const instructions = fields.instructions?.[0];

//     // Basic validation to prevent crashes if required fields are missing
//     if (!name || !category || isNaN(count)) {
//       return res.status(400).json({ message: 'Bad Request: Missing or invalid required fields' });
//     }

//     // Handle file uploads with defensive checks
//     const mainImageUrl = files.mainImage && files.mainImage[0] ? await mockUpload(files.mainImage[0], 'items') : null;
    
//     const thumbnailUrls = [];
//     if (files.thumbnail0 && files.thumbnail0[0]) {
//       thumbnailUrls.push(await mockUpload(files.thumbnail0[0], 'thumbnails'));
//     }
//     if (files.thumbnail1 && files.thumbnail1[0]) {
//       thumbnailUrls.push(await mockUpload(files.thumbnail1[0], 'thumbnails'));
//     }
//     if (files.thumbnail2 && files.thumbnail2[0]) {
//       thumbnailUrls.push(await mockUpload(files.thumbnail2[0], 'thumbnails'));
//     }

//     // Prepare the data to be saved to MongoDB
//     const newItemData = {
//       name,
//       category,
//       count,
//       image: mainImageUrl,
//       thumbnails: thumbnailUrls,
//       shortDescription,
//       instructions,
//     };
    
//     // Create a new instance of the Item model
//     const newItem = new Item(newItemData);

//     // Save the new item to the database
//     await newItem.save();

//     // Success: Return the newly created item document
//     res.status(201).json(newItem);
//   } catch (error) {
//     console.error('Error in handler:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// }

// This file should be located at /api/items/index.js
import { IncomingForm } from 'formidable';
import path from 'path';

// IMPORTANT: This configuration tells Vercel to disable its default
// body parser for this route. This is essential for 'formidable' to work.
export const config = {
  api: {
    bodyParser: false,
  },
};

import Item from "../../server/models/Item";
import connectDB from "../../server/utils/db.js";

// A mock function to simulate uploading a file and returning a URL.
// This function is for demonstration and should be replaced with
// your actual image upload logic (e.g., using @vercel/blob).
const mockUpload = async (file, folder = 'uploads') => {
  if (!file || !file.originalFilename) {
    return null;
  }
  
  const randomId = Math.random().toString(36).substring(7);
  const fileExtension = path.extname(file.originalFilename);
  const publicUrl = `https://mock-storage.vercel.app/${folder}/${randomId}${fileExtension}`;
  
  console.log(`Mocking upload for file: ${file.originalFilename}. Returning URL: ${publicUrl}`);
  
  return publicUrl;
};

export default async function handler(req, res) {
  // 1. Set CORS headers unconditionally at the very top.
  // This is the most crucial step to ensure a preflight OPTIONS request
  // receives the correct response before any other logic runs.
  res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

  // 2. Handle preflight OPTIONS request and return immediately.
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. Ensure the request is a POST before continuing.
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    console.log('Attempting to connect to the database...');
    await connectDB();
    console.log('Successfully connected to the database.');

    // 4. Use formidable to parse the multipart/form-data request.
    // This is the most likely point of failure, so we'll handle it carefully.
    console.log('Attempting to parse form data with formidable...');
    const form = new IncomingForm();
    const { fields, files } = await form.parse(req);
    console.log('Form data parsed successfully.');

    // formidable returns fields as arrays, so we must access with `[0]`
    const name = fields.name?.[0];
    const category = fields.category?.[0];
    const count = Number(fields.count?.[0]);
    const shortDescription = fields.shortDescription?.[0];
    const instructions = fields.instructions?.[0];

    // 5. Perform basic validation to prevent creating a bad item.
    if (!name || !category || isNaN(count)) {
      console.error('Validation failed: Missing or invalid required fields.');
      return res.status(400).json({ message: 'Bad Request: Missing or invalid required fields' });
    }

    // 6. Handle file uploads with defensive checks.
    const mainImageFile = files.mainImage?.[0];
    const mainImageUrl = mainImageFile ? await mockUpload(mainImageFile, 'items') : null;
    
    const thumbnailUrls = [];
    if (files.thumbnail0?.[0]) {
      thumbnailUrls.push(await mockUpload(files.thumbnail0[0], 'thumbnails'));
    }
    if (files.thumbnail1?.[0]) {
      thumbnailUrls.push(await mockUpload(files.thumbnail1[0], 'thumbnails'));
    }
    if (files.thumbnail2?.[0]) {
      thumbnailUrls.push(await mockUpload(files.thumbnail2[0], 'thumbnails'));
    }

    // 7. Prepare the data to be saved to MongoDB.
    const newItemData = {
      name,
      category,
      count,
      image: mainImageUrl,
      thumbnails: thumbnailUrls,
      shortDescription,
      instructions,
    };
    
    console.log('Creating new item in database...');
    // 8. Create a new instance of the Item model and save it.
    const newItem = new Item(newItemData);
    await newItem.save();

    console.log('New item saved successfully.');
    // 9. Success: Return the newly created item document.
    res.status(201).json(newItem);
  } catch (error) {
    // 10. Catch any errors and send a 500 response.
    // This is crucial for preventing the CORS error, as a response
    // will always be sent with the headers from step 1.
    console.error('Error creating new item:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
