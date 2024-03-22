const router = require("express").Router();
const goalsController = require("../controllers/goals-controller");

router.route("/").get(goalsController.list).post(goalsController.add);;
router.route('/:id').get(goalsController.findOne).delete(goalsController.remove).put(goalsController.update);
router.route('/:id/tasks').get(goalsController.tasks);

module.exports = router;