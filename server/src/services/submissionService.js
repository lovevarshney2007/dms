const Submission = require("../models/Submission");

async function createContactSubmission(payload) {
  return Submission.create({
    formType: "contact",
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    source: payload.source,
    subject: payload.subject,
    message: payload.message
  });
}

async function createJoinUsSubmission(payload) {
  return Submission.create({
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
    shortIntroduction: payload.shortIntroduction,
    message: payload.shortIntroduction
  });
}

async function createTalentShowSubmission(payload) {
  return Submission.create({
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
    shortIntroduction: payload.shortIntroduction,
    message: payload.shortIntroduction
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

module.exports = {
  createContactSubmission,
  createJoinUsSubmission,
  createTalentShowSubmission,
  createDonationSubmission,
  createNgoContactSubmission,
  getSubmissions,
  getSubmissionsByTypes
};
