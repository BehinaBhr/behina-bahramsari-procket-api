const knex = require("knex")(require("../knexfile"));
const { validateGoalFields } = require("../validators/goals-validators");
const { categorizedReasons } = require("../utils/utils");

// fields to select for goals
const goalAttr = ["id", "description", "start_date", "end_date"];

const fetchList = async (res, ordering) => {
  try {
    let data;
    if (ordering) {
      data = await knex("goals").where("end_date", ordering, knex.fn.now()).select(goalAttr);
    } else {
      data = await knex("goals").select(goalAttr);
    }
    // Calculate progress percentage for each goal
    for (const goal of data) {
      await calculateProgress(goal);
      await addTotalProcastinationsToGoal(goal);
    }
    data.sort((a, b) => {
      if (a.progress !== b.progress) {
        return a.progress - b.progress; // Sort by progress descending
      }
      return new Date(a.end_date) - new Date(b.end_date); // If progress is the same, sort by start_date ascending
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving goals: ${err}`);
  }
};
// get list of goals
const list = async (_req, res) => {
  await fetchList(res);
};

const past = async (_req, res) => {
  await fetchList(res, "<");
};

const onGoing = async (_req, res) => {
  await fetchList(res, ">");
};

// get a single goal
const findOne = async (req, res) => {
  try {
    const goal = await fetchGoal(req.params.id);

    if (!goal) {
      return res.status(404).json({ error: `Goal with ID ${req.params.id} not found` });
    }

    res.status(200).json(goal);
  } catch (err) {
    res.status(500).send(`Error retrieving goals: ${err}`);
  }
};

// add a new goal
const add = async (req, res) => {
  try {
    const validation = await validateGoalFields(req);
    if (validation) {
      return res.status(validation.status).json({
        message: validation.message,
      });
    }

    const result = await knex("goals").insert(req.body);
    const newGoalId = result[0];
    const createdGoal = await fetchGoal(newGoalId);

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
    const rowsDeleted = await knex("goals").where({ id: req.params.id }).delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: `Goals with ID ${req.params.id} not found` });
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
    const validation = await validateGoalFields(req, true);
    if (validation) {
      return res.status(validation.status).json({
        message: validation.message,
      });
    }
    const rowsUpdated = await knex("goals").where({ id: req.params.id }).update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Goal with ID ${req.params.id} not found`,
      });
    }

    const updatedGoal = await fetchGoal(req.params.id);

    res.status(200).json(updatedGoal);
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
    const goal = await fetchGoal(req.params.id);

    // If goal doesn't exist, return 404 response
    if (!goal) {
      return res.status(404).json({ message: `goal with ID: ${req.params.id} not found` });
    }

    // If goal exists, proceed to fetch tasks
    const tasks = await knex("goals")
      .join("tasks", "tasks.goal_id", "goals.id")
      .where({ goal_id: req.params.id })
      .orderBy('tasks.is_completed', 'asc')
      .orderBy('tasks.due_date')
      .select(
        "tasks.id",
        "tasks.goal_id",
        "goals.description",
        "tasks.description",
        "tasks.is_completed",
        "tasks.due_date"
      );

    for (const task of tasks) {
      await addTotalProcastinationsToTask(task);
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve tasks for goal with ID ${req.params.id}: ${error}`,
    });
  }
};

const procrastinations = async (req, res) => {
  const goal = await fetchGoal(req.params.id);

  if (!goal) {
    return res.status(404).json({ error: `Goal with ID ${req.params.id} not found` });
  }

  try {
    // Fetch all tasks associated with the goal
    const procrastinations = await knex("procrastinations")
      .join("tasks", "procrastinations.task_id", "tasks.id")
      .where({ "tasks.goal_id": req.params.id });
    res.json(categorizedReasons(procrastinations));
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve procrastinations for goal with ID ${req.params.goal_id}: ${error}`,
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
  tasks,
  procrastinations,
};

async function fetchGoal(id) {
  const goal = await knex("goals").where({ id: id }).select(goalAttr).first();
  if (goal) {
    await calculateProgress(goal);
  }
  return goal;
}

async function calculateProgress(goal) {
  const tasks = await knex("tasks").where({ goal_id: goal.id });
  const completedTasks = tasks.filter((item) => item.is_completed);

  // Calculate progress percentage
  const progressPercentage = tasks.length ? (completedTasks.length / tasks.length) * 100 : 0;

  // rounding progress percentage without 2 decimal places;
  goal.progress = parseFloat(progressPercentage.toFixed(2));
}

async function addTotalProcastinationsToGoal(goal) {
  const procrastinations = await knex("procrastinations")
    .join("tasks", "procrastinations.task_id", "tasks.id")
    .where({ "tasks.goal_id": goal.id });
  // rounding progress percentage without 2 decimal places;
  goal.procastinations = parseFloat(procrastinations.length.toFixed(2));
}

async function addTotalProcastinationsToTask(task) {
  const procrastinations = await knex("procrastinations").where({ task_id: task.id });
  // rounding progress percentage without 2 decimal places;
  task.procastinations = parseFloat(procrastinations.length.toFixed(2));
}
