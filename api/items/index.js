import { IncomingForm } from 'formidable';
import { put } from '@vercel/blob';
import QRCode from 'qrcode';
import fs from 'fs'; // We still need this for createReadStream
import Item from "../../server/models/Item";
import connectDB from "../../server/utils/db.js";

// IMPORTANT: This configuration tells Vercel to disable its default
// body parser for this route. Essential for 'formidable' to work.
export const config = {
  api: {
    bodyParser: false,
  },
};

const FRONTEND_BASE_URL = 'https://www.slu-laboratory-resources.engineering/item/';

/**
 * A robust function to upload a file to Vercel's Blob store.
 * @param {object} file - The file object from formidable.
 * @returns {Promise<string|null>} The public URL of the uploaded blob, or null on failure.
 */
const uploadFileToBlob = async (file) => {
  console.log('--- uploadFileToBlob started ---');
  if (!file || !file.filepath || !file.originalFilename) {
    console.error('uploadFileToBlob: Invalid file object received. File:', file);
    return null;
  }

  try {
    // Check if the temporary file exists before trying to read it.
    await fs.promises.stat(file.filepath);
    
    // Create a readable stream from the temporary file path.
    const fileStream = fs.createReadStream(file.filepath);

    // Use the Vercel 'put' function to upload the stream.
    // The key change is adding `addRandomSuffix: true` to prevent filename conflicts.
    const blob = await put(file.originalFilename, fileStream, {
      access: 'public',
      addRandomSuffix: true, // This will ensure every file has a unique name
    });
    
    console.log(`Successfully uploaded file: ${file.originalFilename}. Public URL: ${blob.url}`);
    return blob.url;
  } catch (uploadError) {
    console.error('Error uploading file to Vercel Blob:', uploadError);
    return null;
  } finally {
    console.log('--- uploadFileToBlob finished ---');
    // Ensure the temporary file is deleted, regardless of success or failure.
    // This is a good practice to prevent leftover files on the serverless instance.
    try {
      if (file && file.filepath) {
        await fs.promises.unlink(file.filepath);
        console.log(`Successfully deleted temp file at: ${file.filepath}`);
      }
    } catch (unlinkError) {
      console.error(`Error deleting temp file at: ${file.filepath}`, unlinkError);
    }
  }
};

/**
 * Generates a QR code from a given URL as a data URL.
 * @param {string} url - The URL to encode in the QR code.
 * @returns {Promise<string|null>} The base64 data URL of the QR code, or null on failure.
 */
const generateQRCode = async (url) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url);
    console.log('Successfully generated QR code.');
    return qrCodeDataUrl;
  } catch (qrCodeError) {
    console.error('Error generating QR code:', qrCodeError);
    return null;
  }
};

export default async function handler(req, res) {
  console.log('--- New Request Received ---');
  console.log(`Request Method: ${req.method}`);

  res.setHeader('Access-Control-Allow-Origin', 'https://www.slu-laboratory-resources.engineering');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request.');
    return res.status(200).end();
  }

  // --- NEW GET HANDLER FOR FETCHING ALL ITEMS ---
  if (req.method === 'GET') {
    try {
      await connectDB();
      const items = await Item.find({});
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
    return; // Exit after handling the GET request
  }
  
  if (req.method !== 'POST') {
    console.error('Method Not Allowed. Expected POST or GET.');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Handle POST request for creating a new item
  try {
    console.log('Attempting to parse form data with formidable...');
    const form = new IncomingForm();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Formidable parse error:', err);
          return reject(err);
        }
        resolve({ fields, files });
      });
    });
    console.log('Form data parsed successfully.');

    // Get field values with defensive checks
    const name = fields.name?.[0];
    const category = fields.category?.[0];
    const count = Number(fields.count?.[0]);
    const shortDescription = fields.shortDescription?.[0];
    const instructions = fields.instructions?.[0];

    // 1. UPLOAD FILES FIRST! This is the critical change.
    const mainImageFile = files.mainImage?.[0];
    const mainImageUrl = mainImageFile ? await uploadFileToBlob(mainImageFile) : null;
    
    const thumbnailUrls = [];
    if (files.thumbnail0?.[0]) {
      thumbnailUrls.push(await uploadFileToBlob(files.thumbnail0[0]));
    }
    if (files.thumbnail1?.[0]) {
      thumbnailUrls.push(await uploadFileToBlob(files.thumbnail1[0]));
    }
    if (files.thumbnail2?.[0]) {
      thumbnailUrls.push(await uploadFileToBlob(files.thumbnail2[0]));
    }
    console.log('File uploads processed. Main URL:', mainImageUrl, 'Thumbnail URLs:', thumbnailUrls);

    // 2. Connect to the database and save the data
    console.log('Attempting to connect to the database...');
    await connectDB();
    console.log('Successfully connected to the database.');

    // 3. Perform basic validation after all data is ready.
    if (!name || !category || isNaN(count)) {
      console.error('Validation failed: Missing or invalid required fields.');
      return res.status(400).json({ message: 'Bad Request: Missing or invalid required fields' });
    }
    console.log('Validation passed.');

    const newItemData = {
      name,
      category,
      count,
      image: mainImageUrl, // The URL is now guaranteed to be here (or null if upload failed)
      thumbnails: thumbnailUrls,
      shortDescription,
      instructions,
    };
    
    console.log('Creating new item in database with data:', newItemData);
    const newItem = new Item(newItemData);
    await newItem.save();

    console.log('New item saved successfully.');
    
    // 4. Generate and save QR code
    const itemId = newItem._id;
    const itemUrl = `${FRONTEND_BASE_URL}${itemId}`;
    const qrCodeDataUrl = await generateQRCode(itemUrl);
    
    if (qrCodeDataUrl) {
      newItem.qrCode = qrCodeDataUrl;
      await newItem.save();
      console.log('QR code successfully saved to the item document.');
    }

    res.status(201).json(newItem);
  } catch (error) {
    console.error('A fatal error occurred in the handler:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    console.log('--- Request Finished ---');
  }
}
