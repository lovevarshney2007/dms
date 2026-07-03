const Submission = require("../models/Submission");
const SponsorRequest = require("../models/SponsorRequest");
const ContactQuery = require("../models/ContactQuery");
const Registration = require("../models/Registration");

async function createContactSubmission(payload) {
  return ContactQuery.create({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    source: payload.source,
    subject: payload.subject,
    message: payload.message
  });
}

async function createJoinUsSubmission(payload) {
  return Registration.create({
    formType: "join-us",
    name: payload.name,
    stageName: payload.stageName,
    email: payload.email,
    phone: payload.phone,
    age: payload.age,
    gender: payload.gender,
    city: payload.city,
    talentCategory: payload.talentCategory,
    languagePreference: payload.languagePreference,
    videoLink: payload.videoLink,
    shortIntroduction: payload.shortIntroduction
  });
}

async function createTalentShowSubmission(payload) {
  return Registration.create({
    formType: "talent-show",
    name: payload.name,
    stageName: payload.stageName,
    email: payload.email,
    phone: payload.phone,
    age: payload.age,
    gender: payload.gender,
    city: payload.city,
    talentCategory: payload.talentCategory,
    languagePreference: payload.languagePreference,
    videoLink: payload.videoLink,
    shortIntroduction: payload.shortIntroduction
  });
}


async function createDonationSubmission(payload) {
  return Submission.create({
    formType: "donation",
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    amount: payload.amount,
    purpose: payload.purpose,
    message: payload.message
  });
}

async function createNgoContactSubmission(payload) {
  return Submission.create({
    formType: "ngo-contact",
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    city: payload.city,
    helpType: payload.helpType,
    message: payload.message
  });
}

async function getSubmissions(formType) {
  const query = formType ? { formType } : {};
  return Submission.find(query).sort({ createdAt: -1 }).lean();
}

async function getSubmissionsByTypes(formTypes) {
  return Submission.find({ formType: { $in: formTypes } })
    .sort({ createdAt: -1 })
    .lean();
}

async function createSponsorRequestSubmission(payload) {
  return SponsorRequest.create({
    name: payload.name,
    organization: payload.organization,
    email: payload.email,
    phone: payload.phone,
    website: payload.website,
    sponsorshipTier: payload.sponsorshipTier,
    message: payload.message
  });
}

async function getSponsorRequests({ status, page = 1, limit = 50 } = {}) {
  const query = {};
  if (status) query.status = status;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [items, total] = await Promise.all([
    SponsorRequest.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
    SponsorRequest.countDocuments(query)
  ]);
  return { items, total, page: parseInt(page), limit: parseInt(limit) };
}

async function updateSponsorRequestStatus(id, status) {
  return SponsorRequest.findByIdAndUpdate(id, { status }, { new: true });
}

module.exports = {
  createContactSubmission,
  createJoinUsSubmission,
  createTalentShowSubmission,
  createDonationSubmission,
  createNgoContactSubmission,
  createSponsorRequestSubmission,
  getSubmissions,
  getSubmissionsByTypes,
  getSponsorRequests,
  updateSponsorRequestStatus
};

