const eventCreationRules = [
  { field: "title", required: true },
  { field: "description", required: true },
  { field: "eventDate", required: true },
  { field: "eventLocation", required: true },
  { field: "posterImage", required: true },
  { field: "registrationDeadline", required: true },
  { field: "eventType", required: true },
  { field: "liveLink", required: false }
];

module.exports = {
  eventCreationRules
};
