const router = require("express").Router();
const goalsController = require("../controllers/goals-controller");

router.route("/").get(goalsController.list);
router.route('/:id').get(goalsController.findOne);

module.exports = router;