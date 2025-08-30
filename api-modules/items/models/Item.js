// import mongoose from 'mongoose';

// const ItemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: {type: String},
//   count: {type: Number},
//   image: { type: String, trim: true },
//   thumbnails: [{ type: String, trim: true }],
//   shortDescription: { type: String },
//   instructions: { type: String },
// }, { timestamps: true });

// export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
// server/models/Item.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
            min: 0,
        },
        image: {
            type: String, // Storing the URL to the image
            default: null,
        },
        thumbnails: {
            type: [String], // An array of URLs for thumbnails
            default: [],
        },
        shortDescription: {
            type: String,
            trim: true,
        },
        instructions: {
            type: String,
            trim: true,
        },
        // The new field to store the QR code data URL
        qrCode: {
            type: String,
            default: null,
        }
    },
    {
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
);

const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);

export default Item;
