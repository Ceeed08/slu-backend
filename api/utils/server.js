// Import core packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// // Load environment variables
// dotenv.config();
// console.log("MONGO_URI:", process.env.MONGO_URI); // 👈 see if it prints correctly

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
