const knex = require("knex")(require("../knexfile"));

const validateGoalFields = async (req, res) => {
  const requiredFields = ["description", "start_date", "end_date"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return { status: 400, message: `invalid input: ${field} was null or empty` };
    }
  }

  // Check if same goal already exists
  const existingGoal = await knex("goals")
    .where({ description: req.body.description, start_date: req.body.start_date, end_date: req.body.end_date })
    .first();
  if (existingGoal) {
    return { status: 409, message: "Same goal already exists" };
  }
};

module.exports = { validateGoalFields };
