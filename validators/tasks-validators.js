const knex = require("knex")(require("../knexfile"));

const validateTaskFields = async (req, requiredFields, goal_id) => {
  goal_id = goal_id ? goal_id : req.body["goal_id"];
  try {
    for (const field of requiredFields) {
      if (req.body[field] === null || req.body[field] === "") {
        return { status: 400, message: `invalid input: ${field} was null or empty` };
      }
    }

    const goal = await knex("goals").where({ id: goal_id }).first();
    if (!goal) {
      return { status: 404, message: `Goal ${goal_id} does not exist` };
    }

    const existingTask = await knex("tasks")
      .where({ goal_id: goal_id, description: req.body.description, due_date: req.body.due_date })
      .first();
    if (existingTask) {
      return { status: 409, message: "Task with the same description for this goal already exists" };
    }

    return await validateDueDate(req, goal_id);
  } catch (error) {
    return { status: 500, message: `Error validating task fields: ${error}` };
  }
};

const validateDueDate = async (req, goal_id) => {
  goal_id = goal_id ? goal_id : req.body["goal_id"];
  try {
    const goal = await knex("goals").where({ id: goal_id }).first();
    if (!goal) {
      return { status: 404, message: `Goal ${goal_id} does not exist` };
    }

    const dueDate = req.body.due_date;
    const { start_date, end_date } = goal;

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
