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

const router = express.Router();

// ── Auth ────────────────────────────────────────────────────────────────────
router.post("/admin/login", asyncHandler(adminController.login));

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

// ── Reports (existing) ────────────────────────────────────────────────────────
router.get("/admin/reports/singing", adminAuth, asyncHandler(submissionController.getSingingReports));
router.get("/admin/reports/ngo", adminAuth, asyncHandler(submissionController.getNgoReports));
router.get("/admin/reports/all", adminAuth, asyncHandler(submissionController.getAllReports));

// ── Content Blocks (CMS) ─────────────────────────────────────────────────────
// Supports types: competition, season, qualified-contestant, success-story,
//                 gallery, video, patron, sponsor, testimonial, website-setting
router.get("/admin/content/:type", adminAuth, asyncHandler(contentController.listContent));
router.post("/admin/content/:type", adminAuth, validateContent(), asyncHandler(contentController.createContent));
router.put("/admin/content/:id", adminAuth, validateContent(), asyncHandler(contentController.updateContent));
router.delete("/admin/content/:id", adminAuth, asyncHandler(contentController.deleteContent));

module.exports = router;
