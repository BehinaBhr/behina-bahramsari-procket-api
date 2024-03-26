const router = require('express').Router();
const tasksController = require('../controllers/tasks-controller');

router.route("/").get(tasksController.list).post(tasksController.add);
router.route("/:id").get(tasksController.findOne).delete(tasksController.remove).put(tasksController.update);
router.route('/:id/procrastinations').get(tasksController.procrastinations);

module.exports = router;