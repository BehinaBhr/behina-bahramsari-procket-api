const knex = require("knex")(require("../knexfile"));

// fields to select for goals
const goalAttr = ["id", "goal_description", "start_date", "end_date"];

// get list of goals
const list = async (_req, res) => {
  try {
    const data = await knex("goals").select(goalAttr);
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
      return res
        .status(404)
        .json({ error: `Goal with ID ${req.params.id} not found` });
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

    // if goal fields are empty return error
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

// delete goal
const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("goals")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Goals with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete goal: ${error}`,
    });
  }
};

// update a goal with new input data
const update = async (req, res) => {
  try {
    const requiredFields = ["goal_description", "start_date", "end_date"];

    //confirm fields are not empty
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `invalid input: ${field} was null or empty`,
        });
      }
    }

    const rowsUpdated = await knex("goals")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Goal with ID ${req.params.id} not found`,
      });
    }

    const updatedGoal = await knex("goals")
      .where({
        id: req.params.id,
      })
      .select(goalAttr)
      .first();

    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update goal with ID ${req.params.id}: ${error}`,
    });
  }
};

// tasks for a given goal
const tasks = async (req, res) => {
  try {
    // Check if the goal ID exists
    const goal = await knex("goals")
      .where({ id: req.params.id })
      .select(goalAttr)
      .first();

    // If goal doesn't exist, return 404 response
    if (!goal) {
      return res
        .status(404)
        .json({ message: `goal with ID: ${req.params.id} not found` });
    }

    // If goal exists, proceed to fetch tasks
    const tasks = await knex("goals")
      .join("tasks", "tasks.goal_id", "goals.id")
      .where({ goal_id: req.params.id })
      .select(
        "tasks.id",
        "tasks.goal_id",
        "goals.goal_description",
        "tasks.description",
        "tasks.procrastination_reason",
        "tasks.completion_status",
        "tasks.due_date"
      );

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve tasks for goal with ID ${req.params.id}: ${error}`,
    });
  }
};

module.exports = {
  list,
  findOne,
  add,
  remove,
  update,
  tasks,
};
