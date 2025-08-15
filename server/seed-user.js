const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User').default;
require('dotenv').config();

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    const result = await User.updateMany({ email: 'admin@admin' },
      {
        $set: {
          firstName: 'slu-admin',
          lastName: 'slu-domain',
          address: 'slu-admin-address',
          contactNumber: '09123456789'
        }
      }
    );

    console.log(`Updated ${result.modifiedCount} documents.`);
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');

  } catch (error) {
    console.error('Migration failed:', error);

  }
}

async function seedUser() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const hashedPassword = await bcrypt.hash('!Adm1n-P@$$w0rd#', 10);
  const newUser = new User({
    email: 'admin@admin',
    password: hashedPassword,
    firstName: 'slu-admin',
    lastName: 'slu-admin',
    address: 'slu-admin',
    contactNumber: '09123456789'
  });

  await newUser.save();
  console.log('✅ User created successfully');
  process.exit();
}

migrate();
