 const { shiftDays } = require("../utils/utils");

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
      description: "Finish Procket project",
      start_date: shiftDays(-10),
      end_date: shiftDays(30),
    },
    {
      id: 2,
      description: "Read 5 books",
      start_date: shiftDays(0),
      end_date: shiftDays(45),
    },
    {
      id: 3,
      description: "Learn French",
      start_date: "2024-03-01",
      end_date: "2024-03-31",
    },
    {
      id: 4,
      description: "Exercise 3 times a week",
      start_date: "2024-03-15",
      end_date: "2024-04-30",
    },
    {
      id: 5,
      description: 'Travel to Iran',
      start_date: '2023-05-01',
      end_date: '2023-05-31',
    }
  ]);
};
