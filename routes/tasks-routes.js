const router = require('express').Router();
const tasksController = require('../controllers/tasks-controller');

router.route("/").get(tasksController.list);

module.exports = router;