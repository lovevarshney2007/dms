require('dotenv').config();
const mongoose = require('mongoose');
const ContentBlock = require('./src/models/ContentBlock');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME
    });
    console.log("Connected to MongoDB");

    // Events
    const events = [
      {
        type: 'ngo-camp',
        title: "Cloth Distribution Drive",
        year: "August 2026",
        subtitle: "Greater Noida West — Near Char Murti",
        description: "Join us as we collect and distribute clothes to underprivileged families. Every garment donated brings warmth, dignity and hope to someone in need.",
        imageUrl: "/ngo/clothes-donation.jpeg",
        link: "Distribution Drive"
      },
      {
        type: 'ngo-camp',
        title: "Blood Donation Camp",
        year: "September 2026",
        subtitle: "Surya Nagar, Ghaziabad",
        description: "Join us in saving lives through voluntary blood donation. Your contribution can provide timely support to patients in critical need and bring hope during medical emergencies.",
        imageUrl: "/ngo/blood-camp-1.jpg",
        link: "Health Camp"
      }
    ];

    for (const e of events) {
      const exists = await ContentBlock.findOne({ title: e.title, type: 'ngo-camp' });
      if (!exists) {
        await ContentBlock.create(e);
        console.log("Inserted event:", e.title);
      }
    }

    // Gallery Images
    for (let i = 1; i <= 12; i++) {
      const imgExt = (i === 6 || i === 11 || i === 12) ? 'JPG' : 'jpg';
      const imgPath = `/ngo/img-${i}.${imgExt}`;
      const exists = await ContentBlock.findOne({ imageUrl: imgPath, type: 'ngo-gallery' });
      if (!exists) {
        await ContentBlock.create({
          type: 'ngo-gallery',
          imageUrl: imgPath,
          title: `Activity ${i}`
        });
        console.log("Inserted gallery image:", imgPath);
      }
    }

    console.log("Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
