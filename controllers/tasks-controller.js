const knex = require("knex")(require("../knexfile"));

// get list of tasks
const list = async (_req, res) => {
  try {
    const data = await knex("tasks")
      .join("goals", "goals.id", "tasks.goal_id")
      .select(
        "tasks.id",
        "tasks.goal_id",
        "goals.goal_description",
        "tasks.description",
        "tasks.procrastination_reason",
        "tasks.completion_status",
        "tasks.due_date",
      );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving tasks: ${err}`);
  }
};

module.exports = {
  list,
};
