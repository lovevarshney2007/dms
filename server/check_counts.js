const mongoose = require('mongoose');
const NgoGalleryImage = require('./src/models/NgoGalleryImage');
require('dotenv').config();

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const images = await NgoGalleryImage.aggregate([
    { $group: { _id: '$initiative', count: { $sum: 1 } } }
  ]);
  console.log(images);
  mongoose.disconnect();
}
check().catch(console.error);
