const knex = require("knex")(require("../knexfile"));

const validateGoalFields = async (req, update = false) => {
  // Required fields for goal creation or update
  const requiredFields = ["description", "start_date", "end_date"];

  // Check if required fields are provided and not null or empty
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return { status: 400, message: `Invalid input: ${field} was null or empty` };
    }
  }

  // Check if the same goal already exists
  const existingGoal = await knex("goals").where({
    description: req.body.description,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  });

  // If updating, allow the same goal if it's the only one or doesn't exist
  // If creating, don't allow the same goal if it already exists
  if ((update && existingGoal.length > 1) || (!update && existingGoal.length > 0)) {
    return { status: 409, message: "Same goal already exists" };
  }
};

module.exports = { validateGoalFields };
