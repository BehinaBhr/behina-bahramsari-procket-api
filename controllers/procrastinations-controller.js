const knex = require("knex")(require("../knexfile"));
const { categorizedReasons } = require("../utils/utils");

// Fields to select for procrastinations
const procrastinationAttr = [
  "procrastinations.id",
  "procrastinations.task_id",
  "procrastinations.reason",
  "procrastinations.created_at",
];

// Retrieve grouped list of procrastinations
const grouped_list = async (_req, res) => {
  try {
    // Fetch all procrastinations
    const data = await knex("procrastinations").select(procrastinationAttr);

    // Categorize procrastinations by reason and count
    const reasonCounts = categorizedReasons(data);

    res.status(200).json(reasonCounts);
  } catch (err) {
    res.status(400).send(`Error retrieving procrastinations: ${err}`);
  }
};

// Add a new procrastination
const add = async (req, res) => {
  try {
    const requiredFields = ["task_id", "reason"];

    // Check if required fields are provided
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `Invalid input: ${field} was null or empty`,
        });
      }
    }

    // Check if task exists
    const task = await knex("tasks").where({ id: req.body["task_id"] }).first();
    if (!task) {
      return res.status(400).json({
        message: `Task ${req.body["task_id"]} does not exist`,
      });
    }

    const result = await knex("procrastinations").insert(req.body);
    const newProcrastinationId = result[0];
    const newProcrastination = await knex("procrastinations")
      .select(procrastinationAttr)
      .where({ "procrastinations.id": newProcrastinationId })
      .first();

    res.status(201).json(newProcrastination);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new procrastination: ${error}`,
    });
  }
};

// Delete a procrastination
const remove = async (req, res) => {
  try {
    const deletedRow = await knex("procrastinations").where({ id: req.params.id }).delete();

    // If no rows were deleted, return 404 response
    if (deletedRow === 0) {
      return res.status(404).json({ message: `Procrastination with ID ${req.params.id} not found` });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: `Unable to delete procrastination with ID ${req.params.id}` });
  }
};

module.exports = {
  grouped_list,
  add,
  remove,
};
