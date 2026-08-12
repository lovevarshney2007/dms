const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");

// Models
const NgoTeamMember = require("../models/NgoTeamMember");
const NgoHeroSlide = require("../models/NgoHeroSlide");
const NgoGalleryImage = require("../models/NgoGalleryImage");
const NgoInitiativeContent = require("../models/NgoInitiativeContent");
const NgoBloodDonor = require("../models/NgoBloodDonor");
const Registration = require("../models/Registration");

const router = express.Router();

// GET /api/ngo/team
router.get("/team", asyncHandler(async (req, res) => {
  const team = await NgoTeamMember.find().sort({ order: 1, createdAt: 1 });
  res.json(team);
}));

// GET /api/ngo/gallery/:initiative
router.get("/gallery/:initiative", asyncHandler(async (req, res) => {
  const { initiative } = req.params;
  const filter = initiative !== "home" ? { initiative } : {};
  const images = await NgoGalleryImage.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(images);
}));

const NgoEvent = require("../models/NgoEvent");

// GET /api/ngo/events
router.get("/events", asyncHandler(async (req, res) => {
  const events = await NgoEvent.find().sort({ createdAt: -1 });
  res.json(events);
}));

// GET /api/ngo/content/:slug
router.get("/content/:slug", asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const content = await NgoInitiativeContent.findOne({ slug });
  res.json(content); // Can return null, the client falls back to default
}));

// GET /api/ngo/hero/:initiative
router.get("/hero/:initiative", asyncHandler(async (req, res) => {
  const { initiative } = req.params;
  const slides = await NgoHeroSlide.find({ initiative }).sort({ order: 1, createdAt: 1 });
  res.json(slides);
}));

// POST /api/ngo/volunteers (Submit volunteer request)
router.post("/volunteers", asyncHandler(async (req, res) => {
  // Map fields to what Registration model expects if necessary, 
  // or simply create a Registration with formType="join-us"
  const payload = req.body;
  const registration = await Registration.create({
    ...payload,
    formType: "join-us",
    status: "pending"
  });
  res.status(201).json(registration);
}));

// POST /api/ngo/blood-donors (Submit blood donor registration)
router.post("/blood-donors", asyncHandler(async (req, res) => {
  const payload = req.body;
  const donor = await NgoBloodDonor.create({
    ...payload,
    status: "new"
  });
  res.status(201).json(donor);
}));

module.exports = router;
