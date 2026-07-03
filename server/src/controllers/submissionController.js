const submissionService = require("../services/submissionService");
const emailService = require("../services/emailService");

// Helper: fire-and-forget email (never block the response)
function sendEmailSafely(fn, ...args) {
  fn(...args).catch(err => console.error("[EmailService] Error sending email:", err.message));
}

async function createContactSubmission(req, res) {
  const submission = await submissionService.createContactSubmission(req.body);

  // Send acknowledgement to user + admin notification (non-blocking)
  sendEmailSafely(emailService.sendContactAcknowledgementEmail, {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  });
  sendEmailSafely(emailService.sendAdminContactNotification, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message
  });

  res.status(201).json({
    message: "Contact form submitted successfully.",
    id: submission._id
  });
}

async function createJoinUsSubmission(req, res) {
  const submission = await submissionService.createJoinUsSubmission(req.body);

  // Send registration confirmation email (non-blocking)
  sendEmailSafely(emailService.sendRegistrationEmail, {
    name: req.body.name,
    email: req.body.email,
    formType: "join-us"
  });

  res.status(201).json({
    message: "Join us form submitted successfully.",
    id: submission._id
  });
}

async function createTalentShowSubmission(req, res) {
  const submission = await submissionService.createTalentShowSubmission(req.body);

  // Send registration confirmation email (non-blocking)
  sendEmailSafely(emailService.sendRegistrationEmail, {
    name: req.body.name,
    email: req.body.email,
    formType: "talent-show"
  });

  res.status(201).json({
    message: "Talent show registration submitted successfully.",
    id: submission._id
  });
}

async function createDonationSubmission(req, res) {
  const submission = await submissionService.createDonationSubmission(req.body);

  res.status(201).json({
    message: "Donation form submitted successfully.",
    id: submission._id
  });
}

async function createNgoContactSubmission(req, res) {
  const submission = await submissionService.createNgoContactSubmission(req.body);

  res.status(201).json({
    message: "NGO contact form submitted successfully.",
    id: submission._id
  });
}

async function createSponsorRequestSubmission(req, res) {
  const submission = await submissionService.createSponsorRequestSubmission(req.body);

  // Notify admin about new sponsor request (non-blocking)
  sendEmailSafely(emailService.sendSponsorRequestNotification, {
    name: req.body.name,
    organization: req.body.organization,
    email: req.body.email,
    sponsorshipTier: req.body.sponsorshipTier
  });

  // Send acknowledgement to the user (non-blocking)
  sendEmailSafely(emailService.sendSponsorAcknowledgementEmail, {
    name: req.body.name,
    organization: req.body.organization,
    email: req.body.email
  });

  res.status(201).json({
    message: "Sponsor request submitted successfully.",
    id: submission._id
  });
}

async function getSubmissions(req, res) {
  const submissions = await submissionService.getSubmissions(req.query.formType);
  res.json(submissions);
}

async function getSingingReports(req, res) {
  const submissions = await submissionService.getSubmissionsByTypes(["join-us", "talent-show"]);
  res.json(submissions);
}

async function getNgoReports(req, res) {
  const submissions = await submissionService.getSubmissionsByTypes(["ngo-contact"]);
  res.json(submissions);
}

async function getAllReports(req, res) {
  const submissions = await submissionService.getSubmissions();
  res.json(submissions);
}

module.exports = {
  createContactSubmission,
  createJoinUsSubmission,
  createTalentShowSubmission,
  createDonationSubmission,
  createNgoContactSubmission,
  createSponsorRequestSubmission,
  getSubmissions,
  getSingingReports,
  getNgoReports,
  getAllReports
};
