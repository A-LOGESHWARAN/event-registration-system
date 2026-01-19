const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { createEvent, getEvents } = require("../controllers/eventController");

router.post("/", auth, role("ORGANIZER"), createEvent);
router.get("/", auth, getEvents);

module.exports = router;
