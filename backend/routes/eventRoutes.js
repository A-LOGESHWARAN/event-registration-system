const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  getEvents,
  createEvent
} = require("../controllers/eventController");

// ✅ View events (USER + ORGANIZER)
router.get("/", auth, getEvents);

// ✅ Create event (ORGANIZER only)
router.post("/", auth, createEvent);

module.exports = router;
