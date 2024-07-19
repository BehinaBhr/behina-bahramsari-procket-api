const router = require('express').Router();
const procrastinationsController = require('../controllers/procrastinations-controller');

router.route("/").post(procrastinationsController.add);
router.route("/grouped").get(procrastinationsController.grouped_list)
router.route("/:id").delete(procrastinationsController.remove);

module.exports = router;