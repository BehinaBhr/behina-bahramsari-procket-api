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

// add a new goal 
const add = async (req, res) => {
  try {
    const requiredFields = ["goal_description", "start_date", "end_date"];

    //if goal fields are empty return error
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `invalid input: ${field} was null or empty`,
        });
      }
    }

    // Check if goal with the same description already exists
    const existingGoal = await knex("goals")
      .where({ goal_description: req.body.goal_description })
      .first();
    if (existingGoal) {
      return res.status(409).json({
        message: "Goal with the same description already exists",
      });
    }
    
    const result = await knex("goals").insert(req.body);
    const newGoalId = result[0];
    const createdGoal = await knex("goals")
      .where({ id: newGoalId })
      .select(goalAttr)
      .first();

    res.status(201).json(createdGoal);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new goal: ${error}`,
    });
  }
};

module.exports = {
  list,
  findOne,
  add,
};
