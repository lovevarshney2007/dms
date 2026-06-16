const submissionService = require("../services/submissionService");

async function createContactSubmission(req, res) {
  const submission = await submissionService.createContactSubmission(req.body);

  res.status(201).json({
    message: "Contact form submitted successfully.",
    id: submission._id
  });
}

async function createJoinUsSubmission(req, res) {
  const submission = await submissionService.createJoinUsSubmission(req.body);

  res.status(201).json({
    message: "Join us form submitted successfully.",
    id: submission._id
  });
}

async function createTalentShowSubmission(req, res) {
  const submission = await submissionService.createTalentShowSubmission(req.body);

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
  getSubmissions,
  getSingingReports,
  getNgoReports,
  getAllReports
};
