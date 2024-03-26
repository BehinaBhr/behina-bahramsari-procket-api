const router = require('express').Router();
const procrastinationsController = require('../controllers/procrastinations-controller');

router.route("/").get(procrastinationsController.list).post(procrastinationsController.add);
router.route("/:id").delete(procrastinationsController.remove);

module.exports = router;