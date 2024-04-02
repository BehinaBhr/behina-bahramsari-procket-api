const knex = require("knex")(require("../knexfile"));
const { validateTaskFields } = require("../validators/tasks-validators");
const { categorizedReasons } = require("../utils/utils");

// Fields to select for tasks
const taskAttr = [
  "tasks.id",
  "tasks.goal_id",
  "goals.description as goal_description",
  "tasks.description",
  "tasks.is_completed",
  "tasks.due_date",
];

// Retrieve list of tasks
const list = async (_req, res) => {
  try {
    // Fetch all tasks and associated goals, ordered by completion status and due date
    const data = await knex("tasks")
      .join("goals", "goals.id", "tasks.goal_id")
      .orderBy("is_completed", "asc")
      .orderBy("due_date")
      .select(taskAttr);

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving tasks: ${err}`);
  }
};

// Retrieve past due tasks
const past = async (_req, res) => {
  try {
    // Fetch past due tasks, not completed, ordered by completion status and due date
    const data = await knex("tasks")
      .join("goals", "goals.id", "tasks.goal_id")
      .whereRaw("due_date < CURDATE()")
      .andWhere("is_completed", false)
      .orderBy("is_completed", "asc")
      .orderBy("due_date")
      .select(taskAttr);

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving tasks: ${err}`);
  }
};

// Retrieve ongoing tasks
const onGoing = async (_req, res) => {
  try {
    // Fetch ongoing tasks, not completed, ordered by completion status and due date
    const data = await knex("tasks")
      .join("goals", "goals.id", "tasks.goal_id")
      .whereRaw("due_date >= CURDATE()")
      .andWhere("is_completed", false)
      .orderBy("is_completed", "asc")
      .orderBy("due_date")
      .select(taskAttr);

      res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving tasks: ${err}`);
  }
};

// Retrieve a single task
const findOne = async (req, res) => {
  try {
    // Fetch a single task and its associated goal by ID
    const task = await knex("tasks")
      .join("goals", "goals.id", "tasks.goal_id")
      .select(taskAttr)
      .where({ "tasks.id": req.params.id })
      .first();

    // If task doesn't exist, return 404 response
    if (!task) {
      return res.status(404).json({
        error: `Task with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve task with ID ${req.params.id}: ${error}`,
    });
  }
};

// Add a new task
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

    // Fetch newly created task with associated goal
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

// Delete a task
const remove = async (req, res) => {
  try {
    const deletedRow = await knex("tasks").where({ id: req.params.id }).delete();

    if (deletedRow === 0) {
      return res.status(404).json({ message: `Task with ID ${req.params.id} not found` });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: `Unable to delete task with ID ${req.params.id}` });
  }
};

// Update a task
const update = async (req, res) => {
  try {
    // Retrieve the task by ID
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

    await knex("tasks").where({ id: req.params.id }).update(req.body);

    // Fetch updated task with associated goal
    const updatedTask = await knex("tasks")
      .join("goals", "goals.id", "tasks.goal_id")
      .where({ "tasks.id": req.params.id })
      .select(taskAttr)
      .first();

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update task with ID ${req.params.id}: ${error}`,
    });
  }
};

// Retrieve procrastinations for a task
const procrastinations = async (req, res) => {
  try {
    const task = await knex("tasks").where({ "tasks.id": req.params.id }).first();

    // If task doesn't exist, return 404 response
    if (!task) {
      return res.status(404).json({ message: `Task with ID: ${req.params.id} not found` });
    }

    // If task exists, fetch procrastinations associated with the task
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

// Retrieve categorized procrastinations for a task
const procrastinations_grouped = async (req, res) => {
  try {
    // Fetch task by ID
    const task = await knex("tasks").where({ "tasks.id": req.params.id }).first();

    // If task doesn't exist, return 404 response
    if (!task) {
      return res.status(404).json({ message: `Task with ID: ${req.params.id} not found` });
    }

    // If task exists, fetch procrastinations associated with the task
    const procrastinations = await knex("procrastinations").where({
      task_id: req.params.id,
    });

    // Categorize procrastinations and send response
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
  past,
  onGoing,
  findOne,
  add,
  remove,
  update,
  procrastinations,
  procrastinations_grouped,
};
