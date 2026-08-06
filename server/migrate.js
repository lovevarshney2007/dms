require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

// Mongoose Models
const NgoBloodDonor = require("./src/models/NgoBloodDonor");
const NgoHeroSlide = require("./src/models/NgoHeroSlide");
const NgoGalleryImage = require("./src/models/NgoGalleryImage");
const NgoTeamMember = require("./src/models/NgoTeamMember");
const NgoInitiativeContent = require("./src/models/NgoInitiativeContent");
const Registration = require("./src/models/Registration");
const NgoEvent = require("./src/models/NgoEvent");

const OLD_URI = "mongodb+srv://dmsaarohi_db_user:6b5mX6mlmEpmgDMu@dmsaarohi.8pmz1hu.mongodb.net/?appName=Dmsaarohi";

async function run() {
  const oldClient = new MongoClient(OLD_URI);

  try {
    console.log("Connecting to old DB...");
    await oldClient.connect();
    const oldDb = oldClient.db("test");

    console.log("Connecting to new DB...");
    await mongoose.connect(process.env.MONGODB_URI);

    // 1. blooddonorregistrations -> NgoBloodDonor
    console.log("Migrating blood donors...");
    const donors = await oldDb.collection("blooddonorregistrations").find().toArray();
    await NgoBloodDonor.deleteMany({});
    if (donors.length > 0) {
      await NgoBloodDonor.insertMany(donors.map(d => ({
        name: d.name, phone: d.phone, email: d.email || `${d.phone || "unknown"}@no-email.com`, age: d.age, bloodGroup: d.bloodGroup,
        city: d.city, lastDonationDate: d.lastDonated, status: d.status || "new",
        createdAt: d.createdAt, updatedAt: d.updatedAt
      })));
    }

    // 2. heroslides -> NgoHeroSlide
    console.log("Migrating hero slides...");
    const slides = await oldDb.collection("heroslides").find().toArray();
    await NgoHeroSlide.deleteMany({});
    if (slides.length > 0) {
      await NgoHeroSlide.insertMany(slides.map(s => ({
        initiative: s.initiative, title: s.title, subtitle: s.subtitle,
        image: s.image, order: s.order, createdAt: s.createdAt, updatedAt: s.updatedAt
      })));
    }

    // 3. galleryimages -> NgoGalleryImage
    console.log("Migrating gallery images...");
    const gallery = await oldDb.collection("galleryimages").find().toArray();
    await NgoGalleryImage.deleteMany({});
    if (gallery.length > 0) {
      await NgoGalleryImage.insertMany(gallery.map(g => ({
        initiative: g.initiative, url: g.url, order: g.order,
        createdAt: g.createdAt, updatedAt: g.updatedAt
      })));
    }

    // 4. teammembers -> NgoTeamMember
    console.log("Migrating team members...");
    const team = await oldDb.collection("teammembers").find().toArray();
    await NgoTeamMember.deleteMany({});
    if (team.length > 0) {
      await NgoTeamMember.insertMany(team.map(t => ({
        name: t.name, role: t.role, type: t.type, image: t.image,
        socialLinks: t.socialLinks, order: t.order,
        createdAt: t.createdAt, updatedAt: t.updatedAt
      })));
    }

    // 5. initiativecontents -> NgoInitiativeContent
    console.log("Migrating initiative contents...");
    const content = await oldDb.collection("initiativecontents").find().toArray();
    await NgoInitiativeContent.deleteMany({});
    if (content.length > 0) {
      await NgoInitiativeContent.insertMany(content.map(c => ({
        slug: c.slug, heroTitle: c.heroTitle, heroTagline: c.heroTagline,
        aboutText: c.aboutText, ctaTitle: c.ctaTitle, ctaBody: c.ctaBody,
        ctaButtonLabel: c.ctaButtonLabel, aboutImage: c.aboutImage,
        createdAt: c.createdAt, updatedAt: c.updatedAt
      })));
    }

    // 6. volunteerregistrations -> Registration
    console.log("Migrating volunteers...");
    const volunteers = await oldDb.collection("volunteerregistrations").find().toArray();
    await Registration.deleteMany({ formType: "join-us" });
    if (volunteers.length > 0) {
      await Registration.insertMany(volunteers.map(v => ({
        formType: "join-us",
        name: v.name, email: v.email, phone: v.phone, city: v.city,
        resumeUrl: v.resumeUrl, message: v.message, status: (v.status === "new" ? "pending" : v.status) || "pending",
        createdAt: v.createdAt, updatedAt: v.updatedAt
      })));
    }

    // 7. events -> NgoEvent
    console.log("Migrating NGO events...");
    const events = await oldDb.collection("events").find().toArray();
    await NgoEvent.deleteMany({});
    if (events.length > 0) {
      await NgoEvent.insertMany(events.map(e => ({
        title: e.title, date: e.date, location: e.location, desc: e.desc,
        image: e.image, tag: e.tag, tagColor: e.tagColor, icon: e.icon,
        createdAt: e.createdAt, updatedAt: e.updatedAt
      })));
    }

    console.log("Migration complete!");
  } catch (e) {
    console.error("Migration failed:", e);
  } finally {
    await oldClient.close();
    await mongoose.disconnect();
  }
}

run();
