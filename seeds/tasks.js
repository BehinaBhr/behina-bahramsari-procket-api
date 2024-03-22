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
      procrastination_reason: "no need to rush I still have time for it",
      is_completed: 0,
      due_date: "2024-04-06",
    },
    {
      id: 2,
      goal_id: 1,
      description: "Implement backend APIs",
      procrastination_reason: "Forgetting",
      is_completed: 0,
      due_date: "2024-04-06",
    },
    {
      id: 3,
      goal_id: 2,
      description: "Read 'Sapiens' by Yuval Noah Harari",
      procrastination_reason: "Not feeling in the mood to do it",
      is_completed: 0,
      due_date: "2024-03-31",
    },
    {
      id: 4,
      goal_id: 2,
      description: "Read 'Atomic Habits' by James Clear",
      procrastination_reason: "Sickness or poor health",
      is_completed: 0,
      due_date: "2024-03-31",
    },
    {
      id: 5,
      goal_id: 3,
      description: "Complete Duolingo French course",
      procrastination_reason:
        "nothing bad will happen, no punishment, and no one will find out",
      is_completed: 0,
      due_date: "2024-03-31",
    },
    {
      id: 6,
      goal_id: 3,
      description: "Practice speaking French for 30 minutes daily",
      procrastination_reason:
        "waste time overthinking about what needs to be done and how to do the task instead of starting working on it and engaging in it step by step",
      is_completed: 0,
      due_date: "2024-03-31",
    },
    {
      id: 7,
      goal_id: 4,
      description: "Jogging for 30 minutes, three times a week",
      procrastination_reason:
        "Delaying one task in favor of working on another is a sign of the habit of perfectionism stuck on one step to make it perfect instead of keeping going and improving the whole perspective little by little",
      is_completed: 0,
      due_date: "2024-04-30",
    },
    {
      id: 8,
      goal_id: 5,
      description: "Research and plan itinerary for Iran trip",
      procrastination_reason: "Forgetting",
      is_completed: 0,
      due_date: "2024-05-31",
    },
    {
      id: 9,
      goal_id: 1,
      description: "Implement authentication feature",
      procrastination_reason:
        "nothing bad will happen no punishment and no one find it out = Lacking the initiative to get started",
      is_completed: 0,
      due_date: "2024-04-01",
    },
    {
      id: 10,
      goal_id: 2,
      description: "Read 'The Great Gatsby' by F. Scott Fitzgerald",
      procrastination_reason: "not feeling in the mood to do it",
      is_completed: 0,
      due_date: "2024-03-25",
    },
    {
      id: 11,
      goal_id: 3,
      description: "Attend French language meetup",
      procrastination_reason: "sickness or poor health",
      is_completed: 0,
      due_date: "2024-03-15",
    },
    {
      id: 12,
      goal_id: 4,
      description: "Join a gym",
      procrastination_reason: "no need to rush, I still have time for it",
      is_completed: 0,
      due_date: "2024-03-20",
    },
  ]);
};
