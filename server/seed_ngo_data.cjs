/**
 * seed_ngo_data.cjs
 * Seeds NGO team members, hero slides, initiative content, and sample gallery
 * images into the DMS MongoDB database (dms_aarohi).
 *
 * Run with:  node seed_ngo_data.cjs
 */

const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

// ── Inline schemas (mirrors server models) ─────────────────────────────────

const NgoTeamMember = mongoose.model("NgoTeamMember", new mongoose.Schema({
  name: String, role: String, image: { type: String, default: "" }, order: { type: Number, default: 0 }
}, { timestamps: true }));

const NgoHeroSlide = mongoose.model("NgoHeroSlide", new mongoose.Schema({
  initiative: String, image: String, title: { type: String, default: "" }, subtitle: { type: String, default: "" }, order: { type: Number, default: 0 }
}, { timestamps: true }));

const NgoInitiativeContent = mongoose.model("NgoInitiativeContent", new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  heroTitle: String, heroTagline: String, heroImage: String,
  aboutText: String, aboutImage: String,
  ctaTitle: String, ctaBody: String, ctaButtonLabel: String,
}, { timestamps: true }));

const NgoGalleryImage = mongoose.model("NgoGalleryImage", new mongoose.Schema({
  initiative: String, url: String, order: { type: Number, default: 0 }
}, { timestamps: true }));

const NgoBloodDonor = mongoose.model("NgoBloodDonor", new mongoose.Schema({
  name: String, email: String, phone: String, age: Number, bloodGroup: String,
  weight: Number, city: String, lastDonationDate: String, preferredCamp: String,
  status: { type: String, default: "new" }, notes: String
}, { timestamps: true }));

// ── Seed Data ──────────────────────────────────────────────────────────────

const TEAM = [
  { name: "Pankaj Mathur",   role: "President",         order: 1 },
  { name: "Aarohi Sharma",   role: "Vice President",    order: 2 },
  { name: "Priya Singh",     role: "Secretary General", order: 3 },
  { name: "Rahul Verma",     role: "Treasurer",         order: 4 },
  { name: "Kavita Yadav",    role: "Events Coordinator",order: 5 },
  { name: "Deepak Kumar",    role: "Outreach Head",     order: 6 },
  { name: "Sunita Agarwal",  role: "Joint Secretary",   order: 7 },
  { name: "Manish Gupta",    role: "Media & PR Head",   order: 8 },
];

const HERO_SLIDES = [
  { initiative: "home",               image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200", title: "DMS Aarohi",           subtitle: "Serving Society Since 2010" },
  { initiative: "home",               image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200", title: "Together We Rise",      subtitle: "Empowering Communities" },
  { initiative: "blood-donation",     image: "https://images.unsplash.com/photo-1615461066841-6116e61059a5?w=1200", title: "Donate Blood",         subtitle: "Save a Life Today" },
  { initiative: "blood-donation",     image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1200", title: "Blood Donation Camps", subtitle: "Join Our Next Camp" },
  { initiative: "child-education",    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200", title: "Education for All",    subtitle: "Building Tomorrow's Leaders" },
  { initiative: "beti-bachao",        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200", title: "Beti Bachao",          subtitle: "Protecting Every Girl Child" },
  { initiative: "cloth-distribution", image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=1200", title: "Cloth Distribution",   subtitle: "Warmth for the Needy" },
  { initiative: "senior-citizen",     image: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=1200", title: "Senior Citizen Care",  subtitle: "Honoring Our Elders" },
  { initiative: "environment",        image: "https://images.unsplash.com/photo-1500829243541-74b677fecc30?w=1200", title: "Go Green",             subtitle: "For a Greener Tomorrow" },
];

const INITIATIVE_CONTENT = [
  {
    slug: "blood-donation",
    heroTitle: "Blood Donation & Healthcare",
    heroTagline: "Saving Lives, One Drop at a Time",
    aboutText: "DMS Aarohi organizes regular blood donation camps across Ghaziabad and neighboring areas. Our dedicated volunteers work tirelessly to connect blood donors with those in need.\n\nWe believe every drop counts. Since 2010, we have collected over 5,000 units of blood, directly saving thousands of lives in medical emergencies.",
    ctaTitle: "Register as a Blood Donor",
    ctaBody: "Join our network of life-savers. Register today and we'll notify you when a camp is organized near you.",
    ctaButtonLabel: "Register Now",
  },
  {
    slug: "child-education",
    heroTitle: "Child Education Initiative",
    heroTagline: "Building Tomorrow's Leaders Today",
    aboutText: "Education is the most powerful weapon we can use to change the world. DMS Aarohi runs free tuition centers and skill development programs for underprivileged children.\n\nOur volunteers mentor hundreds of children, ensuring they have access to quality education regardless of their economic background.",
    ctaTitle: "Support a Child's Education",
    ctaBody: "Volunteer as a mentor or sponsor a child's education. Every contribution makes a difference.",
    ctaButtonLabel: "Get Involved",
  },
  {
    slug: "beti-bachao",
    heroTitle: "Beti Bachao Initiative",
    heroTagline: "Every Girl Child Deserves to Live and Thrive",
    aboutText: "DMS Aarohi's Beti Bachao campaign works to create awareness about girl child welfare, education, and empowerment in our communities.\n\nWe organize workshops, awareness campaigns, and support programs to ensure every girl child has equal opportunities and a safe environment to grow.",
    ctaTitle: "Stand for Girl Child Rights",
    ctaBody: "Join us in our mission to protect and empower every girl child. Together we can make a difference.",
    ctaButtonLabel: "Join the Movement",
  },
  {
    slug: "cloth-distribution",
    heroTitle: "Cloth Distribution Drive",
    heroTagline: "Warmth and Dignity for Everyone",
    aboutText: "Our seasonal cloth distribution drives ensure that no one in our community suffers from cold or lack of basic clothing. We collect, sort, and distribute clean clothing to those most in need.\n\nDuring winters, we specifically target homeless populations and daily wage workers to provide warm blankets and woolen clothing.",
    ctaTitle: "Donate Clothes or Volunteer",
    ctaBody: "Have clothes you no longer need? Donate them to someone who does. Or volunteer at our next distribution drive.",
    ctaButtonLabel: "Donate Now",
  },
  {
    slug: "senior-citizen",
    heroTitle: "Senior Citizen Welfare",
    heroTagline: "Honoring Those Who Built Our World",
    aboutText: "DMS Aarohi's senior citizen welfare program provides companionship, medical assistance, and community activities for elderly individuals who may be isolated or without family support.\n\nWe organize monthly gatherings, health check-up camps, and recreational activities to ensure our elders live with dignity and joy.",
    ctaTitle: "Spend Time With Our Elders",
    ctaBody: "Volunteer at our senior citizen center or donate to support our elderly welfare programs.",
    ctaButtonLabel: "Volunteer Today",
  },
  {
    slug: "environment",
    heroTitle: "Environment Awareness Campaign",
    heroTagline: "For a Greener, Cleaner Tomorrow",
    aboutText: "DMS Aarohi's environment initiative focuses on tree plantation drives, cleanliness campaigns, and raising awareness about sustainable living practices in our community.\n\nWe have planted over 10,000 trees and organized hundreds of cleanliness drives, working towards making our neighborhoods greener and cleaner for future generations.",
    ctaTitle: "Join the Green Revolution",
    ctaBody: "Participate in our next tree plantation drive or cleanliness campaign. Every action, big or small, helps our planet.",
    ctaButtonLabel: "Participate Now",
  },
];

const BLOOD_DONORS = [
  { name: "Rahul Verma", email: "rahul.v@example.com", phone: "+91 9876543210", age: 28, bloodGroup: "O+", weight: 75, city: "Ghaziabad", lastDonationDate: "2023-01-15", preferredCamp: "Surya Nagar Camp", status: "verified" },
  { name: "Priya Sharma", email: "priya.s@example.com", phone: "+91 9123456780", age: 24, bloodGroup: "B+", weight: 62, city: "Noida", lastDonationDate: "2023-05-10", preferredCamp: "Greater Noida West", status: "contacted" },
  { name: "Amit Kumar", email: "amit.k@example.com", phone: "+91 9988776655", age: 35, bloodGroup: "A-", weight: 80, city: "Delhi", lastDonationDate: "", preferredCamp: "Any", status: "new" },
  { name: "Sneha Gupta", email: "sneha.g@example.com", phone: "+91 9871234567", age: 29, bloodGroup: "AB+", weight: 58, city: "Ghaziabad", lastDonationDate: "2022-11-20", preferredCamp: "Surya Nagar Camp", status: "new" },
];

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) { console.error("❌ MONGODB_URI not set in .env"); process.exit(1); }

  console.log("⏳ Connecting to MongoDB…");
  await mongoose.connect(uri, { dbName: process.env.MONGODB_DB_NAME || "dms_aarohi" });
  console.log("✅ Connected to MongoDB\n");

  // ── Team ──
  console.log("👥 Seeding NGO team members…");
  await NgoTeamMember.deleteMany({});
  const team = await NgoTeamMember.insertMany(TEAM);
  console.log(`   ✅ ${team.length} team members inserted`);

  // ── Hero Slides ──
  console.log("\n🎯 Seeding NGO hero slides…");
  await NgoHeroSlide.deleteMany({});
  const slides = await NgoHeroSlide.insertMany(HERO_SLIDES);
  console.log(`   ✅ ${slides.length} hero slides inserted`);

  // ── Initiative Content ──
  console.log("\n📝 Seeding NGO initiative content…");
  await NgoInitiativeContent.deleteMany({});
  const content = await NgoInitiativeContent.insertMany(INITIATIVE_CONTENT);
  console.log(`   ✅ ${content.length} initiative content records inserted`);

  // ── Gallery (a few sample images per initiative) ──
  console.log("\n🖼️ Seeding NGO gallery images…");
  await NgoGalleryImage.deleteMany({});
  const GALLERY_IMAGES = [
    { initiative: "home",               url: "https://images.unsplash.com/photo-1593113630400-ea4288922559?w=600" },
    { initiative: "home",               url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600" },
    { initiative: "blood-donation",     url: "https://images.unsplash.com/photo-1615461066841-6116e61059a5?w=600" },
    { initiative: "blood-donation",     url: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600" },
    { initiative: "child-education",    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600" },
    { initiative: "child-education",    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600" },
    { initiative: "beti-bachao",        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600" },
    { initiative: "cloth-distribution", url: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=600" },
    { initiative: "senior-citizen",     url: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=600" },
    { initiative: "environment",        url: "https://images.unsplash.com/photo-1500829243541-74b677fecc30?w=600" },
    { initiative: "environment",        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600" },
  ];
  const gallery = await NgoGalleryImage.insertMany(GALLERY_IMAGES);
  console.log(`   ✅ ${gallery.length} gallery images inserted`);

  // ── Blood Donors ──
  console.log("\n🩸 Seeding NGO blood donors…");
  await NgoBloodDonor.deleteMany({});
  const donors = await NgoBloodDonor.insertMany(BLOOD_DONORS);
  console.log(`   ✅ ${donors.length} blood donors inserted`);

  console.log("\n🎉 NGO seed complete! All data is now in your MongoDB (dms_aarohi).");
  console.log("   Collections seeded: NgoTeamMembers, NgoHeroSlides, NgoInitiativeContents, NgoGalleryImages, NgoBloodDonors");
  await mongoose.disconnect();
}

main().catch(err => { console.error("❌ Seed failed:", err); process.exit(1); });
