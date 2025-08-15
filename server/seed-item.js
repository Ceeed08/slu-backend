// import mongoose from "mongoose";

// // 1️⃣ MongoDB connection string
// // Replace <username>, <password>, and <cluster-url> with your Atlas details
// const MONGODB_URI = "mongodb+srv://root:root@cluster0.d1xo9.mongodb.net/slu?retryWrites=true&w=majority&appName=Cluster0";

// // 2️⃣ Item schema
// const ItemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, trim: true },
//   thumbnails: [{ type: String, trim: true }],
//   shortDescription: { type: String },
//   instructions: { type: String },
// }, { timestamps: true });

// const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);

// // 3️⃣ Main function to insert data
// async function seedData() {
//   try {
//     await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//     const blobURL = "https://xgnocpt9orrgkaiw.public.blob.vercel-storage.com/1.jpg";

//     const newItem = new Item({
//       name: "Sample Adjustable Wrench",
//       image: blobURL,
//       thumbnails: [blobURL, blobURL],
//       shortDescription: "A durable adjustable wrench for all your repair needs.",
//       instructions: "Hold handle, adjust jaw, and turn as needed."
//     });

//     const savedItem = await newItem.save();
//     console.log("✅ Item inserted successfully:", savedItem);

//     mongoose.connection.close();
//   } catch (err) {
//     console.error("❌ Error inserting item:", err);
//     mongoose.connection.close();
//   }
// }

// seedData();
import mongoose from "mongoose";

// 1️⃣ MongoDB connection string
const MONGODB_URI = "mongodb+srv://root:root@cluster0.d1xo9.mongodb.net/slu?retryWrites=true&w=majority&appName=Cluster0";

// 2️⃣ Item schema matching the new schema
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  count: { type: Number },
  image: { type: String, trim: true },
  thumbnails: [{ type: String, trim: true }],
  shortDescription: { type: String },
  instructions: { type: String },
}, { timestamps: true });

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);

// 3️⃣ Main function to insert data
async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const blobURL = "https://xgnocpt9orrgkaiw.public.blob.vercel-storage.com/1.jpg";

    const newItem = new Item({
      name: "Sample Adjustable Wrench",
      category: "Tools",
      count: 10,
      image: blobURL,
      thumbnails: [blobURL, blobURL],
      shortDescription: "A durable adjustable wrench for all your repair needs.",
      instructions: "Hold handle, adjust jaw, and turn as needed."
    });

    const savedItem = await newItem.save();
    console.log("✅ Item inserted successfully:", savedItem);

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting item:", err);
    mongoose.connection.close();
  }
}

seedData();
