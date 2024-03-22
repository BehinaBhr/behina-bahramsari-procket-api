const knex = require("knex")(require("../knexfile"));

// fields to select for goals
const goalAttr = ["id", "goal_description", "start_date", "end_date"];

// get list of goals
const list = async (_req, res) => {
  try {
    const data = await knex("goals")
    .select(goalAttr);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving goals: ${err}`);
  }
};

// get a single goal
const findOne = async (req, res) => {
  try {
    const goal = await knex("goals")
      .where({ id: req.params.id })
      .select(goalAttr)
      .first();
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).send(`Error retrieving goals: ${err}`);
  }
};

module.exports = {
  list,
  findOne,
};
