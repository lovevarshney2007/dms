const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const validateBody = require("../middleware/validateBody");
const { eventCreationRules } = require("../validators/eventValidators");
const adminController = require("../controllers/adminController");
const eventController = require("../controllers/eventController");
const adminAuth = require("../middleware/adminAuth");
const submissionController = require("../controllers/submissionController");
const contentController = require("../controllers/contentController");
const validateContent = require("../middleware/validateContent");
const adminDashboardController = require("../controllers/adminDashboardController");
const submissionService = require("../services/submissionService");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: "Too many login attempts from this IP, please try again after 15 minutes",
});

// NGO-specific models
const NgoTeamMember = require("../models/NgoTeamMember");
const NgoHeroSlide = require("../models/NgoHeroSlide");
const NgoBloodDonor = require("../models/NgoBloodDonor");
const NgoInitiativeContent = require("../models/NgoInitiativeContent");
const NgoGalleryImage = require("../models/NgoGalleryImage");
const NgoEvent = require("../models/NgoEvent");
const Event = require("../models/Event");
const Submission = require("../models/Submission");

const router = express.Router();

// ── Auth ────────────────────────────────────────────────────────────────────
router.post("/admin/login", loginLimiter, asyncHandler(adminController.login));

// ── Dashboard ────────────────────────────────────────────────────────────────
router.get("/admin/dashboard", adminAuth, asyncHandler(adminDashboardController.getDashboard));

// ── Events ────────────────────────────────────────────────────────────────────
router.post(
  "/admin/events",
  adminAuth,
  validateBody(eventCreationRules),
  asyncHandler(eventController.createEvent)
);
router.get("/admin/events", adminAuth, asyncHandler(eventController.listEvents));
router.put(
  "/admin/events/:id",
  adminAuth,
  validateBody(eventCreationRules),
  asyncHandler(eventController.updateEvent)
);
router.delete("/admin/events/:id", adminAuth, asyncHandler(eventController.deleteEvent));

// ── Registrations (Qualified Contestants) ────────────────────────────────────
router.get("/admin/registrations", adminAuth, asyncHandler(adminDashboardController.getRegistrations));
router.put("/admin/registrations/:id/status", adminAuth, asyncHandler(adminDashboardController.updateRegistrationStatus));

// ── Contact Queries ────────────────────────────────────────────────────────────
router.get("/admin/contact-queries", adminAuth, asyncHandler(adminDashboardController.getContactQueries));
router.put("/admin/contact-queries/:id/status", adminAuth, asyncHandler(adminDashboardController.updateContactQueryStatus));

// ── Sponsor Requests ──────────────────────────────────────────────────────────
router.get("/admin/sponsor-requests", adminAuth, asyncHandler(async (req, res) => {
  const { status, page, limit } = req.query;
  const data = await submissionService.getSponsorRequests({ status, page, limit });
  res.json(data);
}));
router.put("/admin/sponsor-requests/:id/status", adminAuth, asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!["pending", "contacted", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }
  const item = await submissionService.updateSponsorRequestStatus(req.params.id, status);
  if (!item) return res.status(404).json({ message: "Sponsor request not found." });
  res.json(item);
}));

// ── NGO Events ────────────────────────────────────────────────────────────
router.get("/admin/ngo/events", adminAuth, asyncHandler(async (req, res) => {
  const events = await NgoEvent.find().sort({ createdAt: -1 });
  res.json(events);
}));

router.post("/admin/ngo/events", adminAuth, asyncHandler(async (req, res) => {
  const { title, date, location, desc, image, tag, tagColor, icon } = req.body;
  if (!title || !date) return res.status(400).json({ message: "Title and date are required" });
  const newEvent = new NgoEvent({ title, date, location, desc, image, tag, tagColor, icon });
  await newEvent.save();
  res.status(201).json(newEvent);
}));

router.put("/admin/ngo/events/:id", adminAuth, asyncHandler(async (req, res) => {
  const event = await NgoEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
}));

router.delete("/admin/ngo/events/:id", adminAuth, asyncHandler(async (req, res) => {
  const event = await NgoEvent.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json({ message: "Event deleted" });
}));

// ── NGO Content (Initiatives) ─────────────────────────────────────────────

// ── NGO Volunteers ────────────────────────────────────────────────────────────
router.get("/admin/volunteers", adminAuth, asyncHandler(adminDashboardController.getVolunteers));
router.put("/admin/volunteers/:id/status", adminAuth, asyncHandler(adminDashboardController.updateVolunteerStatus));

// ── NGO Contact Queries ───────────────────────────────────────────────────────
router.get("/admin/ngo-queries", adminAuth, asyncHandler(adminDashboardController.getNgoQueries));
router.put("/admin/ngo-queries/:id/status", adminAuth, asyncHandler(adminDashboardController.updateNgoQueryStatus));

// ── Reports (existing) ────────────────────────────────────────────────────────
router.get("/admin/reports/singing", adminAuth, asyncHandler(submissionController.getSingingReports));
router.get("/admin/reports/ngo", adminAuth, asyncHandler(submissionController.getNgoReports));
router.get("/admin/reports/all", adminAuth, asyncHandler(submissionController.getAllReports));

// ── Content Blocks (CMS) ─────────────────────────────────────────────────────
// Supports types: competition, season, qualified-contestant, success-story,
//                 gallery, video, patron, sponsor, testimonial, website-setting
//                 ngo-gallery, ngo-camp, ngo-initiative
router.get("/admin/content/:type", adminAuth, asyncHandler(contentController.listContent));
router.post("/admin/content/:type", adminAuth, validateContent(), asyncHandler(contentController.createContent));
router.put("/admin/content/:id", adminAuth, validateContent(), asyncHandler(contentController.updateContent));
router.delete("/admin/content/:id", adminAuth, asyncHandler(contentController.deleteContent));

// ── NGO Team ─────────────────────────────────────────────────────────────────
router.get("/admin/ngo/team", adminAuth, asyncHandler(async (req, res) => {
  const team = await NgoTeamMember.find().sort({ order: 1, createdAt: 1 });
  res.json(team);
}));
router.post("/admin/ngo/team", adminAuth, asyncHandler(async (req, res) => {
  const { name, role, image } = req.body;
  if (!name || !role) return res.status(400).json({ message: "Name and role required" });
  const member = await NgoTeamMember.create({ name, role, image });
  res.status(201).json(member);
}));
router.put("/admin/ngo/team/:id", adminAuth, asyncHandler(async (req, res) => {
  const { name, role, image } = req.body;
  const member = await NgoTeamMember.findByIdAndUpdate(req.params.id, { name, role, image }, { new: true });
  if (!member) return res.status(404).json({ message: "Member not found" });
  res.json(member);
}));
router.delete("/admin/ngo/team/:id", adminAuth, asyncHandler(async (req, res) => {
  const member = await NgoTeamMember.findByIdAndDelete(req.params.id);
  if (!member) return res.status(404).json({ message: "Member not found" });
  res.json({ success: true });
}));

// ── NGO Hero Slides ───────────────────────────────────────────────────────────
router.get("/admin/ngo/hero/:initiative", asyncHandler(async (req, res) => {
  const slides = await NgoHeroSlide.find({ initiative: req.params.initiative }).sort({ order: 1, createdAt: 1 });
  res.json(slides);
}));
router.post("/admin/ngo/hero/:initiative", adminAuth, asyncHandler(async (req, res) => {
  const { image, title, subtitle } = req.body;
  if (!image) return res.status(400).json({ message: "Image URL required" });
  const slide = await NgoHeroSlide.create({ initiative: req.params.initiative, image, title, subtitle });
  res.status(201).json(slide);
}));
router.delete("/admin/ngo/hero/:initiative/:id", adminAuth, asyncHandler(async (req, res) => {
  const slide = await NgoHeroSlide.findOneAndDelete({ _id: req.params.id, initiative: req.params.initiative });
  if (!slide) return res.status(404).json({ message: "Slide not found" });
  res.json({ success: true });
}));

// ── NGO Blood Donors ──────────────────────────────────────────────────────────
router.get("/admin/ngo/blood-donors", adminAuth, asyncHandler(async (req, res) => {
  const { status, search } = req.query;
  const query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { city: { $regex: search, $options: "i" } },
      { bloodGroup: { $regex: search, $options: "i" } },
    ];
  }
  const donors = await NgoBloodDonor.find(query).sort({ createdAt: -1 });
  res.json(donors);
}));
router.post("/admin/ngo/blood-donors", asyncHandler(async (req, res) => {
  // Public: forms from the NGO website submit here
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) return res.status(400).json({ message: "Name, phone and email are required" });
  const donor = await NgoBloodDonor.create(req.body);
  res.status(201).json(donor);
}));
router.put("/admin/ngo/blood-donors/:id/status", adminAuth, asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!["new", "contacted", "verified"].includes(status)) return res.status(400).json({ message: "Invalid status" });
  const donor = await NgoBloodDonor.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!donor) return res.status(404).json({ message: "Donor not found" });
  res.json(donor);
}));
router.delete("/admin/ngo/blood-donors/:id", adminAuth, asyncHandler(async (req, res) => {
  const donor = await NgoBloodDonor.findByIdAndDelete(req.params.id);
  if (!donor) return res.status(404).json({ message: "Donor not found" });
  res.json({ success: true });
}));

// ── NGO Initiative Content (text) ─────────────────────────────────────────────
router.get("/admin/ngo/content/:slug", asyncHandler(async (req, res) => {
  const content = await NgoInitiativeContent.findOne({ slug: req.params.slug });
  res.json(content || null);
}));
router.put("/admin/ngo/content/:slug", adminAuth, asyncHandler(async (req, res) => {
  const { heroTitle, heroTagline, heroImage, aboutText, aboutImage, ctaTitle, ctaBody, ctaButtonLabel } = req.body;
  const content = await NgoInitiativeContent.findOneAndUpdate(
    { slug: req.params.slug },
    { heroTitle, heroTagline, heroImage, aboutText, aboutImage, ctaTitle, ctaBody, ctaButtonLabel },
    { new: true, upsert: true }
  );
  res.json(content);
}));

// ── NGO Per-Initiative Gallery ─────────────────────────────────────────────────
router.get("/admin/ngo/gallery/:initiative", asyncHandler(async (req, res) => {
  const images = await NgoGalleryImage.find({ initiative: req.params.initiative }).sort({ order: 1, createdAt: 1 });
  res.json(images);
}));
router.post("/admin/ngo/gallery/:initiative", adminAuth, asyncHandler(async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "Image URL required" });
  const image = await NgoGalleryImage.create({ initiative: req.params.initiative, url });
  res.status(201).json(image);
}));
router.delete("/admin/ngo/gallery/:initiative/:id", adminAuth, asyncHandler(async (req, res) => {
  const image = await NgoGalleryImage.findOneAndDelete({ _id: req.params.id, initiative: req.params.initiative });
  if (!image) return res.status(404).json({ message: "Image not found" });
  res.json({ success: true });
}));

// ── NGO Dashboard Stats (supplement existing) ─────────────────────────────────
router.get("/admin/ngo/stats", adminAuth, asyncHandler(async (req, res) => {
  const [teamCount, bloodDonorsCount, eventsCount, volunteersCount, galleryImages] = await Promise.all([
    NgoTeamMember.countDocuments(),
    NgoBloodDonor.countDocuments(),
    NgoEvent.countDocuments(),
    Submission.countDocuments({ formType: "join-us" }),
    NgoGalleryImage.find({}, 'initiative')
  ]);
  
  const galleryByInitiative = galleryImages.reduce((acc, img) => {
    acc[img.initiative] = (acc[img.initiative] || 0) + 1;
    return acc;
  }, {});

  res.json({ teamCount, bloodDonorsCount, eventsCount, volunteersCount, galleryByInitiative });
}));

module.exports = router;

