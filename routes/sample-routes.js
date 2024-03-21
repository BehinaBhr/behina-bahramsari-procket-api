const router = require("express").Router();
const sampleController = require("../controllers/sample-controller");

router.route("/").get(sampleController.getWelcomeMessage)
module.exports = router;