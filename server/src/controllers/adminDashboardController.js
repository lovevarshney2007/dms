const Submission = require("../models/Submission");
const Registration = require("../models/Registration");
const ContactQuery = require("../models/ContactQuery");
const Event = require("../models/Event");
const ContentBlock = require("../models/ContentBlock");
const SponsorRequest = require("../models/SponsorRequest");

async function getDashboard(req, res) {
  const [
    totalRegistrations,
    contactQueries,
    totalEvents,
    sponsorRequests,
    competitions,
    seasons,
    qualifiedContestants,
    successStories,
    galleryItems,
    videos,
    patrons,
    sponsors,
    testimonials
  ] = await Promise.all([
    Registration.countDocuments(),
    ContactQuery.countDocuments(),
    Event.countDocuments(),
    SponsorRequest.countDocuments(),
    ContentBlock.countDocuments({ type: "competition" }),
    ContentBlock.countDocuments({ type: "season" }),
    ContentBlock.countDocuments({ type: "qualified-contestant" }),
    ContentBlock.countDocuments({ type: "success-story" }),
    ContentBlock.countDocuments({ type: "gallery" }),
    ContentBlock.countDocuments({ type: "video" }),
    ContentBlock.countDocuments({ type: "patron" }),
    ContentBlock.countDocuments({ type: "sponsor" }),
    ContentBlock.countDocuments({ type: "testimonial" })
  ]);

  res.json({
    totalRegistrations,
    contactQueries,
    totalEvents,
    sponsorRequests,
    competitions,
    seasons,
    qualifiedContestants,
    successStories,
    galleryItems,
    videos,
    patrons,
    sponsors,
    testimonials
  });
}


async function getRegistrations(req, res) {
  const { formType, status, search, page = 1, limit = 50 } = req.query;
  const query = {};
  if (formType && ["join-us", "talent-show"].includes(formType)) {
    query.formType = formType;
  }
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { city: { $regex: search, $options: "i" } }
    ];
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [items, total] = await Promise.all([
    Registration.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
    Registration.countDocuments(query)
  ]);
  res.json({ items, total, page: parseInt(page), limit: parseInt(limit) });
}

async function updateRegistrationStatus(req, res) {
  const { status } = req.body;
  if (!["pending", "approved", "rejected", "shortlisted"].includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }
  const item = await Registration.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!item) return res.status(404).json({ message: "Registration not found." });
  res.json(item);
}

async function getContactQueries(req, res) {
  const { status, page = 1, limit = 50 } = req.query;
  const query = {};
  if (status) query.status = status;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [items, total] = await Promise.all([
    ContactQuery.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
    ContactQuery.countDocuments(query)
  ]);
  res.json({ items, total, page: parseInt(page), limit: parseInt(limit) });
}

async function updateContactQueryStatus(req, res) {
  const { status } = req.body;
  if (!["pending", "replied", "resolved"].includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }
  const item = await ContactQuery.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!item) return res.status(404).json({ message: "Query not found." });
  res.json(item);
}

module.exports = {
  getDashboard,
  getRegistrations,
  updateRegistrationStatus,
  getContactQueries,
  updateContactQueryStatus
};
