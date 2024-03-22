const router = require("express").Router();
const goalsController = require("../controllers/goals-controller");

router.route("/").get(goalsController.list);

module.exports = router;