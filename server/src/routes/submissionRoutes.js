const express = require("express");
const submissionController = require("../controllers/submissionController");
const eventController = require("../controllers/eventController");
const contentController = require("../controllers/contentController");
const asyncHandler = require("../middleware/asyncHandler");
const validateBody = require("../middleware/validateBody");
const {
  contactSubmissionRules,
  donationSubmissionRules,
  joinUsSubmissionRules,
  talentShowSubmissionRules,
  ngoContactSubmissionRules
} = require("../validators/submissionValidators");

const router = express.Router();

router.post(
  "/forms/contact",
  validateBody(contactSubmissionRules),
  asyncHandler(submissionController.createContactSubmission)
);

router.post(
  "/forms/join-us",
  validateBody(joinUsSubmissionRules),
  asyncHandler(submissionController.createJoinUsSubmission)
);

router.post(
  "/forms/talent-show",
  validateBody(talentShowSubmissionRules),
  asyncHandler(submissionController.createTalentShowSubmission)
);

router.post(
  "/forms/donation",
  validateBody(donationSubmissionRules),
  asyncHandler(submissionController.createDonationSubmission)
);

router.post(
  "/forms/ngo-contact",
  validateBody(ngoContactSubmissionRules),
  asyncHandler(submissionController.createNgoContactSubmission)
);

router.get("/submissions", asyncHandler(submissionController.getSubmissions));
router.get("/events", asyncHandler(eventController.listEvents));
router.get("/content/:type", asyncHandler(contentController.listContent));

module.exports = router;
