const mongoose = require('mongoose');
const uri = 'mongodb+srv://dmsaarohi_db_user:6b5mX6mlmEpmgDMu@dmsaarohi.8pmz1hu.mongodb.net/?appName=Dmsaarohi';
const galleryImageSchema = new mongoose.Schema(
  {
    initiative: String,
    url: String,
    order: Number,
  },
  { timestamps: true },
);
const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);
async function check() {
  await mongoose.connect(uri);
  const count = await GalleryImage.countDocuments();
  console.log('Old DB GalleryImage count:', count);
  const images = await GalleryImage.find();
  console.log('Sample:', images[0]);
  mongoose.disconnect();
}
check().catch(console.error);
