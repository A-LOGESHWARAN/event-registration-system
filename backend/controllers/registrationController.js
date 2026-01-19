const Event = require("../models/Event");
const Registration = require("../models/Registration");

exports.registerEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    const alreadyRegistered = await Registration.findOne({
      user: userId,
      event: eventId
    });

    if (alreadyRegistered) {
      return res.status(400).json({ message: "Already registered" });
    }

    await Registration.create({
      user: userId,
      event: eventId
    });

    // ✅ SAFE increment
    event.registeredCount = event.registeredCount + 1;
    await event.save();

    res.status(200).json({ message: "Registered successfully" });

  } catch (err) {
    console.error("REGISTER EVENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user.id
    }).populate("event");

    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

