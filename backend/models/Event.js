const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  capacity: Number,
  registeredCount: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

// 🔥 Performance index
eventSchema.index({ createdBy: 1 });

module.exports = mongoose.model("Event", eventSchema);
