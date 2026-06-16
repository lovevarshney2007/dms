const Event = require("../models/Event");

async function createEvent(payload) {
  return Event.create({
    title: payload.title,
    description: payload.description,
    eventDate: payload.eventDate,
    eventLocation: payload.eventLocation,
    posterImage: payload.posterImage,
    registrationDeadline: payload.registrationDeadline,
    eventType: payload.eventType,
    liveLink: payload.liveLink || ""
  });
}

async function listEvents() {
  return Event.find().sort({ eventDate: 1 }).lean();
}

async function updateEvent(id, payload) {
  return Event.findByIdAndUpdate(
    id,
    {
      title: payload.title,
      description: payload.description,
    eventDate: payload.eventDate,
    eventLocation: payload.eventLocation,
    posterImage: payload.posterImage,
    registrationDeadline: payload.registrationDeadline,
    eventType: payload.eventType,
    liveLink: payload.liveLink || ""
    },
    { new: true, runValidators: true }
  );
}

async function deleteEvent(id) {
  return Event.findByIdAndDelete(id);
}

module.exports = {
  createEvent,
  listEvents,
  updateEvent,
  deleteEvent
};
