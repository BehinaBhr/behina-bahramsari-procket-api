const knex = require("knex")(require("../knexfile"));
const { validateTaskFields } = require("../validators/tasks-validators");
const { categorizedReasons } = require("../utils/utils");

// fields to select for tasks
const taskAttr = [
  "tasks.id",
  "tasks.goal_id",
  "goals.description as goal_description",
  "tasks.description",
  "tasks.is_completed",
  "tasks.due_date",
];

// get list of tasks
const list = async (_req, res) => {
  try {
    const data = await knex("tasks").join("goals", "goals.id", "tasks.goal_id").select(taskAttr);
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
    const validation = await validateTaskFields(req, requiredFields);

    if (validation) {
      return res.status(validation.status).json({
        message: validation.message,
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
    const deletedRow = await knex("tasks").where({ id: req.params.id }).delete();
    if (deletedRow === 0) {
      // Checking if the task with the specified ID exists
      return res.status(404).json({ message: `Task with ID ${req.params.id} not found` });
    }
    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: `Unable to delete task with ID ${req.params.id}` });
  }
};

// update an task with new input data
const update = async (req, res) => {
  try {
    // Retrieve the task and its associated goal
    const task = await knex("tasks").where({ id: req.params.id }).first();
    if (!task) {
      return res.status(404).json({
        message: `Task with ID ${req.params.id} not found`,
      });
    }

    const requiredFields = ["description", "is_completed", "due_date"];
    const validation = await validateTaskFields(req, requiredFields, task.goal_id);

    if (validation) {
      return res.status(validation.status).json({
        message: validation.message,
      });
    }
    // Update the task in the database
    await knex("tasks").where({ id: req.params.id }).update(req.body);

    // Retrieve the updated task from the database
    const updatedTask = await knex("tasks")
      .join("goals", "goals.id", "tasks.goal_id")
      .where({ "tasks.id": req.params.id })
      .select(taskAttr)
      .first();

    // Respond with the updated task
    res.status(200).json(updatedTask);
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).json({
      message: `Unable to update task with ID ${req.params.id}: ${error}`,
    });
  }
};

// procrastinations for a given goal
const procrastinations = async (req, res) => {
  try {
    const task = await knex("tasks").where({ "tasks.id": req.params.id }).first();

    // If task doesn't exist, return 404 response
    if (!task) {
      return res.status(404).json({ message: `task with ID: ${req.params.id} not found` });
    }

    // If task exists, proceed to fetch procrastinations
    const procrastinations = await knex("procrastinations").where({
      task_id: req.params.id,
    });

    res.json(procrastinations);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve procrastinations for task with ID ${req.params.id}: ${error}`,
    });
  }
};

// procrastinations for a given goal
const procrastinations_grouped = async (req, res) => {
  try {
    // Check if the task ID exists
    const task = await knex("tasks").where({ "tasks.id": req.params.id }).first();

    // If task doesn't exist, return 404 response
    if (!task) {
      return res.status(404).json({ message: `task with ID: ${req.params.id} not found` });
    }

    // If task exists, proceed to fetch procrastinations
    const procrastinations = await knex("procrastinations").where({
      task_id: req.params.id,
    });

    const reasonCounts = categorizedReasons(procrastinations);

    res.json(reasonCounts);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve procrastinations for task with ID ${req.params.id}: ${error}`,
    });
  }
};

module.exports = {
  list,
  findOne,
  add,
  remove,
  update,
  procrastinations,
  procrastinations_grouped,
};
