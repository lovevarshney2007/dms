const eventService = require("../services/eventService");

async function createEvent(req, res) {
  const event = await eventService.createEvent(req.body);

  res.status(201).json({
    message: "Event created successfully.",
    id: event._id
  });
}

async function listEvents(req, res) {
  const events = await eventService.listEvents();
  res.json(events);
}

async function updateEvent(req, res) {
  const updated = await eventService.updateEvent(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Event not found." });
  }
  res.json({ message: "Event updated successfully.", id: updated._id });
}

async function deleteEvent(req, res) {
  const deleted = await eventService.deleteEvent(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Event not found." });
  }
  res.json({ message: "Event deleted successfully." });
}

module.exports = {
  createEvent,
  listEvents,
  updateEvent,
  deleteEvent
};
