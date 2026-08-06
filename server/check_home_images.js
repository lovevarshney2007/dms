const mongoose = require('mongoose');
const NgoGalleryImage = require('./src/models/NgoGalleryImage');
require('dotenv').config();

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const images = await NgoGalleryImage.find({ initiative: 'home' });
  console.log('Homepage images count: ' + images.length);
  mongoose.disconnect();
}
check().catch(console.error);