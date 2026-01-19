const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const { title, capacity } = req.body;

  const event = await Event.create({
    title,
    capacity,
    organizer: req.user.id
  });

  res.json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};
