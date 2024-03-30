const knex = require("knex")(require("../knexfile"));

const list = async (req, res) => {
  try {
    const data = await knex
      .select("goals.id")
      .from("goals")
      .leftJoin("tasks", "goals.id", "tasks.goal_id")
      .groupBy("goals.id")
      .havingRaw("COUNT(tasks.id) = SUM(CASE WHEN tasks.is_completed = true THEN 1 ELSE 0 END)");

    const rocketsCount = data.length;
    let rockets = [];
    for (let i = 1; i <= rocketsCount; i++) {
      const imagePath = `images/rocket-${i}.png`;
      rockets.push(imagePath);
    }
    res.status(200).json(rockets);
  } catch (err) {
    res.status(400).send(`Error retrieving goals: ${err}`);
  }
};

module.exports = {
  list,
};
