const knex = require("knex")(require("../knexfile"));

// fields to select for tasks
const taskAttr = [
  "tasks.id",
  "tasks.goal_id",
  "goals.goal_description",
  "tasks.description",
  "tasks.procrastination_reason",
  "tasks.completion_status",
  "tasks.due_date",
];

// get list of tasks
const list = async (_req, res) => {
  try {
    const data = await knex("tasks")
      .join("goals", "goals.id", "tasks.goal_id")
      .select(taskAttr);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving tasks: ${err}`);
  }
};

// get a single task
const findOne = async (req, res) => {
  try {
    const task = await knex("tasks")
      .join("goals", "goals.id", "tasks.goal_id")
      .select(taskAttr)
      .where({ "tasks.id": req.params.id })
      .first();

    if (!task) {
      return res.status(404).json({
        error: `Task with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve task with with ID ${req.params.id}: ${error}`,
    });
  }
};

module.exports = {
  list,
  findOne,
};
