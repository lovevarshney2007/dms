const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const ContentBlock = require("./src/models/ContentBlock");

async function seedGallery() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME || "dms_aarohi",
    });
    console.log("Connected to MongoDB.");

    const galleryItems = [];
    let orderCounter = 1;
    
    for (let i = 45; i <= 96; i++) {
      galleryItems.push({
        type: "gallery",
        title: `Talent Hunt Highlights ${i}`,
        imageUrl: `/talenthunt/${i}.jpg`,
        tags: ["Talent Hunt", "Highlights"],
        order: orderCounter++
      });
    }

    for (const item of galleryItems) {
      const existing = await ContentBlock.findOne({ type: "gallery", imageUrl: item.imageUrl });
      if (!existing) {
        await ContentBlock.create(item);
        console.log(`Inserted ${item.imageUrl}`);
      } else {
        console.log(`Skipped ${item.imageUrl} (already exists)`);
      }
    }

    console.log("Gallery seeding complete.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding gallery:", error);
    process.exit(1);
  }
}

seedGallery();
