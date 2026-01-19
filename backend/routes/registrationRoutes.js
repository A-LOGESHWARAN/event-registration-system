const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  registerEvent,
  myRegistrations,
  eventRegistrations
} = require("../controllers/registrationController");

router.post("/:id", auth, role("USER"), registerEvent);
router.get("/me", auth, role("USER"), myRegistrations);
router.get("/event/:id", auth, role("ORGANIZER"), eventRegistrations);

module.exports = router;
