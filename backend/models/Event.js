const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  capacity: { type: Number, required: true },
  registeredCount: { type: Number, default: 0 },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Event", eventSchema);
