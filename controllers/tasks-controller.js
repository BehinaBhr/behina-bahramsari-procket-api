const knex = require("knex")(require("../knexfile"));

// fields to select for tasks
const taskAttr = [
  "tasks.id",
  "tasks.goal_id",
  "goals.goal_description",
  "tasks.description",
  "tasks.procrastination_reason",
  "tasks.is_completed",
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

// add a new task
const add = async (req, res) => {
  try {
    const requiredFields = ["goal_id", "description", "due_date"];

    // check if field is empty if not insert into the table
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `invalid input: ${field} was null or empty`,
        });
      }
    }

    // check if goal exists
    const goal = await knex("goals").where({ id: req.body["goal_id"] }).first();
    if (!goal) {
      return res.status(400).json({
        message: `goal ${req.body["goal_id"]} does not exist`,
      });
    }

    // Check if task with the same description already exists
    const existingTask = await knex("tasks")
      .where({ goal_id: req.body.goal_id, description: req.body.description })
      .first();
    if (existingTask) {
      return res.status(409).json({
        message: "Task with the same description for this goal already exists",
      });
    }

    // Check if the task's due date is after the goal's end date or before the start date
    
    // TODO: Convert goal start date to a string without timezone information
    // const goalStartDate = goal.start_date.toISOString().split("T")[0];
    // const goalEndDate = goal.end_date.toISOString().split("T")[0];

    const dueDate = new Date(req.body.due_date);
    const goalStartDate = goal.start_date;
    const goalEndDate = goal.end_date;
    const formattedGoalStartDate = goal.start_date.toISOString().split("T")[0];
    const formattedGoalEndDate = goal.end_date.toISOString().split("T")[0];

    if (dueDate > goalEndDate || dueDate < goalStartDate) {
      return res.status(400).json({
        message: `Task due date must be between the goal's start date ${formattedGoalStartDate} and end date ${formattedGoalEndDate}`,
      });
    }

    const result = await knex("tasks").insert(req.body);
    const newtaskId = result[0];
    const newTask = await knex("tasks")
      .join("goals", "goals.id", "tasks.goal_id")
      .select(taskAttr)
      .where({ "tasks.id": newtaskId })
      .first();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new task: ${error}`,
    });
  }
};

// delete an task
const remove = async (req, res) => {
  try {
    const deletedRow = await knex("tasks")
      .where({ id: req.params.id })
      .delete();
    if (deletedRow === 0) {
      // Checking if the task with the specified ID exists
      return res
        .status(404)
        .json({ message: `Task with ID ${req.params.id} not found` });
    }
    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to delete task with ID ${req.params.id}` });
  }
};

module.exports = {
  list,
  findOne,
  add,
  remove,
};
