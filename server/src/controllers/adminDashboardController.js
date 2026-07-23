const Submission = require("../models/Submission");
const Registration = require("../models/Registration");
const ContactQuery = require("../models/ContactQuery");
const Event = require("../models/Event");
const ContentBlock = require("../models/ContentBlock");
const SponsorRequest = require("../models/SponsorRequest");

async function getDashboard(req, res) {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalRegistrations,
    newRegistrations,
    ngoVolunteers,
    talentQueries,
    ngoQueries,
    upcomingEvents,
    seasons,
    // Base stats
    totalEvents,
    sponsorRequests,
    competitions,
    qualifiedContestants,
    successStories,
    galleryItems,
    videos,
    patrons,
    sponsors,
    testimonials,
    
    // Recent activity fetches
    recentRegistrations,
    recentTalentQueries,
    recentNgoQueries
  ] = await Promise.all([
    Registration.countDocuments({ formType: "talent-show" }),
    Registration.countDocuments({ formType: "talent-show", createdAt: { $gte: sevenDaysAgo } }),
    Registration.countDocuments({ formType: "join-us" }),
    ContactQuery.countDocuments(),
    Submission.countDocuments({ formType: "ngo-contact" }),
    Event.countDocuments({ eventDate: { $gte: new Date() } }),
    ContentBlock.countDocuments({ type: "season" }),
    
    Event.countDocuments(),
    SponsorRequest.countDocuments(),
    ContentBlock.countDocuments({ type: "competition" }),
    ContentBlock.countDocuments({ type: "qualified-contestant" }),
    ContentBlock.countDocuments({ type: "success-story" }),
    ContentBlock.countDocuments({ type: "gallery" }),
    ContentBlock.countDocuments({ type: "video" }),
    ContentBlock.countDocuments({ type: "patron" }),
    ContentBlock.countDocuments({ type: "sponsor" }),
    ContentBlock.countDocuments({ type: "testimonial" }),

    Registration.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    ContactQuery.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    Submission.find({ formType: "ngo-contact" }).sort({ createdAt: -1 }).limit(5).lean()
  ]);

  // Combine and format recent activity
  const combinedActivity = [
    ...recentRegistrations.map(r => ({
      id: `reg-${r._id}`,
      type: r.formType === 'talent-show' ? 'talent' : 'ngo',
      msg: `New ${r.formType === 'talent-show' ? 'registration' : 'volunteer'} — ${r.name || 'Unknown'} (${r.city || 'Unknown'})`,
      time: r.createdAt,
      dot: r.formType === 'talent-show' ? 'gold' : 'green',
      timestamp: r.createdAt ? new Date(r.createdAt).getTime() : 0
    })),
    ...recentTalentQueries.map(q => ({
      id: `tq-${q._id}`,
      type: 'talent',
      msg: `Contact query — "${q.subject || (q.message || '').substring(0, 30)}..."`,
      time: q.createdAt,
      dot: 'gold',
      timestamp: q.createdAt ? new Date(q.createdAt).getTime() : 0
    })),
    ...recentNgoQueries.map(n => ({
      id: `nq-${n._id}`,
      type: 'ngo',
      msg: `NGO query — "${(n.message || '').substring(0, 30)}..."`,
      time: n.createdAt,
      dot: 'green',
      timestamp: n.createdAt ? new Date(n.createdAt).getTime() : 0
    }))
  ];

  const recentActivity = combinedActivity
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 6)
    .map(a => {
      delete a.timestamp;
      return a;
    });

  res.json({
    totalRegistrations,
    newRegistrations,
    ngoVolunteers,
    talentQueries,
    ngoQueries,
    upcomingEvents,
    totalSeasons: seasons,
    
    // Existing values returned previously as well
    contactQueries: talentQueries, 
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
    testimonials,
    
    recentActivity
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

async function getVolunteers(req, res) {
  const { status, search, page = 1, limit = 50 } = req.query;
  const query = { formType: "join-us" };
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

async function updateVolunteerStatus(req, res) {
  const { status } = req.body;
  const validStatuses = ["pending", "active", "inactive", "contacted"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }
  const item = await Registration.findOneAndUpdate(
    { _id: req.params.id, formType: "join-us" },
    { status },
    { new: true }
  );
  if (!item) return res.status(404).json({ message: "Volunteer not found." });
  res.json(item);
}

async function getNgoQueries(req, res) {
  const { status, search, page = 1, limit = 50 } = req.query;
  const query = { formType: "ngo-contact" };
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } }
    ];
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [items, total] = await Promise.all([
    Submission.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
    Submission.countDocuments(query)
  ]);
  res.json({ items, total, page: parseInt(page), limit: parseInt(limit) });
}

async function updateNgoQueryStatus(req, res) {
  const { status } = req.body;
  const validStatuses = ["pending", "replied", "resolved"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }
  const item = await Submission.findOneAndUpdate(
    { _id: req.params.id, formType: "ngo-contact" },
    { status },
    { new: true }
  );
  if (!item) return res.status(404).json({ message: "NGO query not found." });
  res.json(item);
}

module.exports = {
  getDashboard,
  getRegistrations,
  updateRegistrationStatus,
  getContactQueries,
  updateContactQueryStatus,
  getVolunteers,
  updateVolunteerStatus,
  getNgoQueries,
  updateNgoQueryStatus
};
