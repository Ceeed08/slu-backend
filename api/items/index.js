// This file should be located at /api/items/index.js
import Item from "../../server/models/Item";
import connectDB from "../../server/utils/db.js"; // Corrected path to utils

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

    const newItemData = req.body;
    
    // Create a new instance of the Item model with the request body data
    const newItem = new Item(newItemData);

    // Save the new item to the database
    await newItem.save();

    // Success: Return the newly created item document
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating new item:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
