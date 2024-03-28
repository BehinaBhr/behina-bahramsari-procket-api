const knex = require("knex")(require("../knexfile"));
const { categorizedReasons } = require("../utils/utils");
// fields to select for tasks
const procrastinationAttr = [
  "procrastinations.id",
  "procrastinations.task_id",
  "procrastinations.reason",
  "procrastinations.created_at",
];

const grouped_list = async (_req, res) => {
  try {
    const data = await knex("procrastinations").select(procrastinationAttr);
    const reasonCounts = categorizedReasons(data);
    res.status(200).json(reasonCounts);
  } catch (err) {
    res.status(400).send(`Error retrieving procrastinations: ${err}`);
  }
};

// add a new procrastination
const add = async (req, res) => {
  try {
    const requiredFields = ["task_id", "reason"];

    // check if field is empty if not insert into the table
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `invalid input: ${field} was null or empty`,
        });
      }
    }

    // check if task exists
    const task = await knex("tasks").where({ id: req.body["task_id"] }).first();
    if (!task) {
      return res.status(400).json({
        message: `task ${req.body["task_id"]} does not exist`,
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

// delete a procrastination
const remove = async (req, res) => {
  try {
    const deletedRow = await knex("procrastinations").where({ id: req.params.id }).delete();
    if (deletedRow === 0) {
      // Checking if the procrastination with the specified ID exists
      return res.status(404).json({ message: `Procrastination with ID ${req.params.id} not found` });
    }
    // No Content response
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
