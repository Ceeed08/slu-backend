// // This file should be located at /api/items/index.js
// import Item from "../../server/models/Item";
// import connectDB from "../../server/utils/db.js"; // Corrected path to utils

// export default async function handler(req, res) {
//   // Set CORS headers for all responses
//   res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   // Handle preflight OPTIONS request
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   // Handle POST request to add a new item
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     await connectDB();

//     const newItemData = req.body;
    
//     // Create a new instance of the Item model with the request body data
//     const newItem = new Item(newItemData);

//     // Save the new item to the database
//     await newItem.save();

//     // Success: Return the newly created item document
//     res.status(201).json(newItem);
//   } catch (error) {
//     console.error('Error creating new item:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// }
// This file should be located at /api/items/index.js
import { IncomingForm } from 'formidable';
import path from 'path';

// This configuration tells Vercel to disable its default body parser
// for this route, allowing 'formidable' to handle the incoming file data.
export const config = {
  api: {
    bodyParser: false,
  },
};

import Item from "../../server/models/Item";
import connectDB from "../../server/utils/db.js";

// A mock function to simulate uploading a file to Vercel's Blob or an
// external storage service and returning a URL.
// In a real-world scenario, you would replace this with
// your actual image upload logic using a library like @vercel/blob
// or the AWS SDK for S3.
const mockUpload = async (file, folder = 'uploads') => {
  if (!file) {
    return null;
  }
  
  // This is a placeholder URL. Your real upload function would
  // return a URL like 'https://your-storage-bucket.com/images/12345.jpg'
  const randomId = Math.random().toString(36).substring(7);
  const fileExtension = path.extname(file.originalFilename);
  const publicUrl = `https://mock-storage.vercel.app/${folder}/${randomId}${fileExtension}`;
  
  console.log(`Mocking upload for file: ${file.originalFilename}. Returning URL: ${publicUrl}`);
  
  return publicUrl;
};

export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST request to add a new item
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectDB();

    // Use formidable to parse the multipart/form-data request
    const form = new IncomingForm();

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    // 1. Get the URLs by uploading the files
    // formidable wraps single files in an array, so we access with `[0]`
    const mainImageUrl = await mockUpload(files.mainImage?.[0], 'items');

    const thumbnailUrls = [];
    if (files.thumbnail0 && files.thumbnail0[0]) {
      thumbnailUrls.push(await mockUpload(files.thumbnail0[0], 'thumbnails'));
    }
    if (files.thumbnail1 && files.thumbnail1[0]) {
      thumbnailUrls.push(await mockUpload(files.thumbnail1[0], 'thumbnails'));
    }
    if (files.thumbnail2 && files.thumbnail2[0]) {
      thumbnailUrls.push(await mockUpload(files.thumbnail2[0], 'thumbnails'));
    }

    // 2. Prepare the data to be saved to MongoDB
    // formidable returns fields as arrays, so we must access with `[0]`
    const newItemData = {
      name: fields.name?.[0],
      category: fields.category?.[0],
      count: Number(fields.count?.[0]),
      image: mainImageUrl, // Assign the URL string
      thumbnails: thumbnailUrls, // Assign the array of URL strings
      shortDescription: fields.shortDescription?.[0],
      instructions: fields.instructions?.[0],
    };
    
    // 3. Create a new instance of the Item model
    const newItem = new Item(newItemData);

    // 4. Save the new item to the database
    await newItem.save();

    // Success: Return the newly created item document
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating new item:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
