const router = require("express").Router();
const rocketsController = require("../controllers/rockets-controller");

router.route("/").get(rocketsController.list);
module.exports = router;