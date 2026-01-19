const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  registerEvent,
  getMyRegistrations
} = require("../controllers/registrationController");

// ✅ FIX: STATIC ROUTE FIRST
router.get("/my", auth, getMyRegistrations);

// Register for event (dynamic route LAST)
router.post("/:id", auth, registerEvent);

module.exports = router;
