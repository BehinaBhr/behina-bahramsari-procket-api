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
      is_completed: 0,
      due_date: "2024-04-06",
    },
    {
      id: 2,
      goal_id: 1,
      description: "Implement backend APIs",
      is_completed: 0,
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
      is_completed: 0,
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
      goal_id: 3,
      description: "Practice speaking French for 30 minutes daily",
      is_completed: 0,
      due_date: "2024-03-31",
    },
    {
      id: 7,
      goal_id: 4,
      description: "Jogging for 30 minutes, three times a week",
      is_completed: 0,
      due_date: "2024-04-30",
    },
    {
      id: 8,
      goal_id: 5,
      description: "Research and plan itinerary for Iran trip",
      is_completed: 0,
      due_date: "2024-05-31",
    },
    {
      id: 9,
      goal_id: 1,
      description: "Implement authentication feature",
      is_completed: 0,
      due_date: "2024-04-01",
    },
    {
      id: 10,
      goal_id: 2,
      description: "Read 'The Great Gatsby' by F. Scott Fitzgerald",
      is_completed: 0,
      due_date: "2024-03-25",
    },
    {
      id: 11,
      goal_id: 3,
      description: "Attend French language meetup",
      is_completed: 0,
      due_date: "2024-03-15",
    },
    {
      id: 12,
      goal_id: 4,
      description: "Join a gym",
      is_completed: 0,
      due_date: "2024-03-20",
    },
  ]);
};
