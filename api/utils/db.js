// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGO_URI;

// if (!MONGODB_URI) {
//   throw new Error('❌ Missing MONGO_URI in environment variables');
// }

// let cached = global.mongoose || { conn: null, promise: null };

// async function connectToDatabase() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }).then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectToDatabase;
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error('❌ Missing MONGO_URI in environment variables');
}

let cached = global.mongoose || { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  global.mongoose = cached;
  return cached.conn;
}

export default connectToDatabase;
