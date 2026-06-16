const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const validateBody = require("../middleware/validateBody");
const { eventCreationRules } = require("../validators/eventValidators");
const adminController = require("../controllers/adminController");
const eventController = require("../controllers/eventController");
const adminAuth = require("../middleware/adminAuth");
const submissionController = require("../controllers/submissionController");

const router = express.Router();

router.post("/admin/login", asyncHandler(adminController.login));

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

router.get("/admin/reports/singing", adminAuth, asyncHandler(submissionController.getSingingReports));
router.get("/admin/reports/ngo", adminAuth, asyncHandler(submissionController.getNgoReports));
router.get("/admin/reports/all", adminAuth, asyncHandler(submissionController.getAllReports));

module.exports = router;
