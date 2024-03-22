const router = require('express').Router();
const tasksController = require('../controllers/tasks-controller');

router.route("/").get(tasksController.list);
router.route("/:id").get(tasksController.findOne);

module.exports = router;