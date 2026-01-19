const Event = require("../models/Event");

// USER & ORGANIZER – view events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ORGANIZER – create event
exports.createEvent = async (req, res) => {
  try {
    const { title, capacity } = req.body;

    if (!title || !capacity) {
      return res.status(400).json({ message: "All fields required" });
    }

    const event = new Event({
      title,
      capacity,
      registeredCount: 0,
      organizer: req.user.id
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
