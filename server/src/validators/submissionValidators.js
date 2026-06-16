const contactSubmissionRules = [
  { field: "name", required: true },
  { field: "email", required: true },
  { field: "phone", required: true },
  { field: "subject", required: true },
  { field: "message", required: true }
];

const joinUsSubmissionRules = [
  { field: "name", required: true },
  { field: "stageName", required: false },
  { field: "age", required: true },
  { field: "gender", required: true },
  { field: "city", required: true },
  { field: "phone", required: true },
  { field: "email", required: true },
  { field: "talentCategory", required: true },
  { field: "languagePreference", required: true },
  { field: "videoLink", required: true },
  { field: "shortIntroduction", required: true }
];

const talentShowSubmissionRules = [
  { field: "name", required: true },
  { field: "stageName", required: false },
  { field: "age", required: true },
  { field: "gender", required: true },
  { field: "city", required: true },
  { field: "phone", required: true },
  { field: "email", required: true },
  { field: "talentCategory", required: true },
  { field: "languagePreference", required: true },
  { field: "videoLink", required: true },
  { field: "shortIntroduction", required: true }
];

const donationSubmissionRules = [
  { field: "name", required: true },
  // Email optional for donations per request
  { field: "email", required: false },
  { field: "phone", required: true },
  // Amount optional for donations per request
  { field: "amount", required: false },
  { field: "purpose", required: true }
];

const ngoContactSubmissionRules = [
  { field: "name", required: true },
  { field: "phone", required: true },
  { field: "email", required: true },
  { field: "city", required: true },
  { field: "helpType", required: true },
  { field: "message", required: true }
];

module.exports = {
  contactSubmissionRules,
  joinUsSubmissionRules,
  talentShowSubmissionRules,
  donationSubmissionRules,
  ngoContactSubmissionRules
};
