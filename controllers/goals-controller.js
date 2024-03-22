const knex = require("knex")(require("../knexfile"));

//fields to select for goals
const goalAttr = ["id", "goal_description", "start_date", "end_date"];

//get list of warehouses
const list = async (_req, res) => {
    try {
      const data = await knex("goals").select(goalAttr);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(`Error retrieving goals: ${err}`);
    }
  };

module.exports = {
  list,
};
