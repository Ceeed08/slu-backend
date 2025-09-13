// // import mongoose from 'mongoose';

// // const ItemSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   category: {type: String},
// //   count: {type: Number},
// //   image: { type: String, trim: true },
// //   thumbnails: [{ type: String, trim: true }],
// //   shortDescription: { type: String },
// //   instructions: { type: String },
// // }, { timestamps: true });

// // export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
// import mongoose from 'mongoose';

// const ItemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: { type: String },
//   count: { type: Number },
//   image: { type: String, trim: true },
//   thumbnails: [{ type: String, trim: true }],
//   shortDescription: { type: String },
//   instructions: { type: String },
//   isActive: { type: Boolean, default: true }, // Add this new field
// }, { timestamps: true });

// export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  count: { type: Number },
  image: { type: String, trim: true },
  thumbnails: [{ type: String, trim: true }],
  shortDescription: { type: String },
  instructions: { type: String },
  qrCode: { type: String, trim: true }, // Added QR code field
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);

export default Item;
