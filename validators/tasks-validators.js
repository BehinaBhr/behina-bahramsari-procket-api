const knex = require("knex")(require("../knexfile"));

const validateTaskFields = async (req, res, requiredFields, goal_id) => {
  goal_id = goal_id ? goal_id : req.body["goal_id"];
  try {
    for (const field of requiredFields) {
      if (req.body[field] === null || req.body[field] === "") {
        return res.status(400).json({
          message: `Invalid input: ${field} was null or empty`,
        });
      }
    }

    const goal = await knex("goals").where({ id: goal_id }).first();
    if (!goal) {
      return res.status(400).json({
        message: `Goal ${goal_id} does not exist`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error validating task fields: ${error}`,
    });
  }
};

const validateDueDate = async (req, res, goal_id) => {
  goal_id = goal_id ? goal_id : req.body["goal_id"];
  try {
    const goal = await knex("goals").where({ id: goal_id }).first();
    if (!goal) {
      return res.status(400).json({
        message: `Goal ${goal_id} does not exist`,
      });
    }

    const dueDate = req.body.due_date;
    const { start_date, end_date } = goal;

    if (dueDate > end_date || dueDate < start_date) {
      return res.status(400).json({
        message: `Task due date must be between the goal's start date ${start_date} and end date ${end_date}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error validating due date: ${error}`,
    });
  }
};

module.exports = {
  validateTaskFields,
  validateDueDate,
};
