const knex = require("knex")(require("../knexfile"));

const validateTaskFields = async (req, requiredFields, goal_id = null) => {
  // Determine the final goal ID to use
  const final_goal_id = goal_id || req.body["goal_id"];

  try {
    // Check if required fields are provided and not null or empty
    for (const field of requiredFields) {
      if (req.body[field] === null || req.body[field] === "") {
        return { status: 400, message: `Invalid input: ${field} was null or empty` };
      }
    }

    // Check if the goal associated with the task exists
    const goal = await knex("goals").where({ id: final_goal_id }).first();
    if (!goal) {
      return { status: 404, message: `Goal ${final_goal_id} does not exist` };
    }

    // Check if a task with the same description already exists for this goal
    const existingTask = await knex("tasks").where({
      goal_id: final_goal_id,
      description: req.body.description,
      due_date: req.body.due_date,
    });

    // Determine if the action is an update or creation and if the task is duplicated
    const updateAction = goal_id !== null;
    const taskIsDuplicated = (updateAction && existingTask.length > 1) || (!updateAction && existingTask.length > 0);
    if (taskIsDuplicated) {
      return { status: 409, message: "Task with the same description for this goal already exists" };
    }

    // Validate the due date of the task
    return await validateDueDate(req, final_goal_id);
  } catch (error) {
    return { status: 500, message: `Error validating task fields: ${error}` };
  }
};

const validateDueDate = async (req, goal_id) => {
  try {
    const goal = await knex("goals").where({ id: goal_id }).first();
    if (!goal) {
      return { status: 404, message: `Goal ${goal_id} does not exist` };
    }

    // Retrieve due date and goal's start and end date
    const dueDate = req.body.due_date;
    const { start_date, end_date } = goal;

    // Check if due date falls within the goal's start and end date range
    if (dueDate > end_date || dueDate < start_date) {
      return {
        status: 400,
        message: `Task due date must be between the goal's start date ${start_date} and end date ${end_date}`,
      };
    }
  } catch (error) {
    return { status: 500, message: `Error validating due date: ${error}` };
  }
};

module.exports = {
  validateTaskFields,
};
