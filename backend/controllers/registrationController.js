const Registration = require("../models/Registration");
const Event = require("../models/Event");

exports.registerEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (event.registeredCount >= event.capacity) {
    return res.status(400).json({ message: "Event full" });
  }

  const already = await Registration.findOne({
    user: req.user.id,
    event: event._id
  });

  if (already) {
    return res.status(400).json({ message: "Already registered" });
  }

  await Registration.create({
    user: req.user.id,
    event: event._id
  });

  event.registeredCount += 1;
  await event.save();

  res.json({ message: "Registered successfully" });
};
