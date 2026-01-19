const Event = require("../models/Event");
const Registration = require("../models/Registration");
exports.registerEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;

    // 1️⃣ Get event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 2️⃣ Capacity check
    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({ message: "Event Full" });
    }

    // 3️⃣ Create registration (DB-level duplicate protection exists)
    await Registration.create({
      userId: req.user.id,
      eventId
    });

    // 4️⃣ Increment count safely
    event.registeredCount += 1;
    await event.save();

    res.json({ message: "Registered successfully" });

  } catch (err) {
    // Duplicate registration
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already registered" });
    }
    next(err);
  }
};

exports.myRegistrations = async (req, res, next) => {
  try {
    const data = await Registration.find({ userId: req.user.id })
      .populate("eventId");
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.eventRegistrations = async (req, res, next) => {
  try {
    const data = await Registration.find({ eventId: req.params.id })
      .populate("userId");
    res.json(data);
  } catch (err) {
    next(err);
  }
};
