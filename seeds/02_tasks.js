/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tasks").del();
  await knex("tasks").insert([
    {
      id: 1,
      goal_id: 1,
      description: "Complete frontend development",
      is_completed: 1,
      due_date: "2024-04-06",
    },
    {
      id: 2,
      goal_id: 1,
      description: "Implement backend APIs",
      is_completed: 1,
      due_date: "2024-04-06",
    },
    {
      id: 3,
      goal_id: 2,
      description: "Read 'Sapiens' by Yuval Noah Harari",
      is_completed: 0,
      due_date: "2024-03-31",
    },
    {
      id: 4,
      goal_id: 2,
      description: "Read 'Atomic Habits' by James Clear",
      is_completed: 1,
      due_date: "2024-03-31",
    },
    {
      id: 5,
      goal_id: 3,
      description: "Complete Duolingo French course",
      is_completed: 0,
      due_date: "2024-03-31",
    },
    {
      id: 6,
      goal_id: 5,
      description: "Research and create a list of must-visit attractions in Iran",
      is_completed: 1,
      due_date: "2024-05-31",
    },
    {
      id: 7,
      goal_id: 1,
      description: "Implement authentication feature",
      is_completed: 0,
      due_date: "2024-04-01",
    },
    {
      id: 8,
      goal_id: 2,
      description: "Read 'The Great Gatsby' by F. Scott Fitzgerald",
      is_completed: 0,
      due_date: "2024-03-25",
    },
    {
      id: 9,
      goal_id: 2,
      description: "Read 'Thinking, Fast and Slow' by Daniel Kahneman",
      is_completed: 0,
      due_date: "2024-03-25",
    },
    {
      id: 10,
      goal_id: 2,
      description: "Read 'The Power of Habit' by Charles Duhigg",
      is_completed: 1,
      due_date: "2024-03-27",
    },
    {
      id: 11,
      goal_id: 3,
      description: "Watch French movies with subtitles",
      is_completed: 0,
      due_date: "2024-03-20",
    },
    {
      id: 12,
      goal_id: 3,
      description: "Take online conversation classes in French",
      is_completed: 0,
      due_date: "2024-03-25",
    },
    {
      id: 13,
      goal_id: 4,
      description: "Attend a yoga class on Youtube",
      is_completed: 1,
      due_date: "2024-03-19",
    },
    {
      id: 14,
      goal_id: 4,
      description: "Go for a hike in nature",
      is_completed: 1,
      due_date: "2024-03-21",
    },
    {
      id: 15,
      goal_id: 5,
      description: "Learn about Iranian culture and customs",
      is_completed: 1,
      due_date: "2024-04-20",
    },
    {
      id: 16,
      goal_id: 5,
      description: "Arrange accommodation in different cities of Iran",
      is_completed: 1,
      due_date: "2024-04-25",
    },
    {
      id: 17,
      goal_id: 5,
      description: "Research local cuisine and must-try dishes in Iran",
      is_completed: 1,
      due_date: "2024-04-30",
    },
    {
      id: 18,
      goal_id: 5,
      description: "Book flights to Iran",
      is_completed: 1,
      due_date: "2024-04-25",
    },
    {
      id: 19,
      goal_id: 5,
      description: "Exchange currency to Iranian rial",
      is_completed: 1,
      due_date: "2024-04-29",
    },
    {
      id: 20,
      goal_id: 5,
      description: "Learn basic Persian phrases",
      is_completed: 1,
      due_date: "2024-05-01",
    },
  ]);
};
