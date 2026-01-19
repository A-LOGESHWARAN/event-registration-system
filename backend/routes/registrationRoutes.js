const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { registerEvent } = require("../controllers/registrationController");

router.post("/:id", auth, registerEvent);

module.exports = router;
