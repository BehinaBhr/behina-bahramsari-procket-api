/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("goals").del();
  await knex("goals").insert([
    {
      id: 1,
      goal_description: "Finish Procket project",
      start_date: "2024-03-18",
      end_date: "2024-04-06",
    },
    {
      id: 2,
      goal_description: "Read 5 books",
      start_date: "2024-03-01",
      end_date: "2024-03-31",
    },
    {
      id: 3,
      goal_description: 'Learn French',
      start_date: '2024-03-01',
      end_date: '2024-03-31',
    },
    {
      id: 4,
      goal_description: 'Exercise 3 times a week',
      start_date: '2024-03-15',
      end_date: '2024-04-30',
    },
    {
      id: 5,
      goal_description: 'Travel to Iran',
      start_date: '2024-05-01',
      end_date: '2024-05-31',
    }
  ]);
};
