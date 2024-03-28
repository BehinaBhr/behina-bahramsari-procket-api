/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("procrastinations").del();
  await knex("procrastinations").insert([
    {
      id: 1,
      task_id: 1,
      reason: "No rush, plenty of time",
    },
    {
      id: 2,
      task_id: 1,
      reason: "Forgetting",
    },
    {
      id: 3,
      task_id: 1,
      reason: "Not being in the mood",
    },
    {
      id: 4,
      task_id: 2,
      reason: "Forgetting",
    },
    {
      id: 5,
      task_id: 3,
      reason: "Not being in the mood",
    },
    {
      id: 6,
      task_id: 4,
      reason: "Sickness or poor health",
    },
    {
      id: 7,
      task_id: 5,
      reason:
        "Nothing bad will happen",
    },
    {
      id: 8,
      task_id: 6,
      reason:
        "Overthinking the task",
    },
    {
      id: 9,
      task_id: 7,
      reason:
        "Delaying one task to perfect another",
    },
    {
      id: 10,
      task_id: 7,
      reason: "Forgetting",
    },
    {
      id: 11,
      task_id: 7,
      reason: "Sickness or poor health",
    },
    {
      id: 12,
      task_id: 7,
      reason: "Sickness or poor health",
    },
    {
      id: 13,
      task_id: 7,
      reason: "Sickness or poor health",
    },
    {
      id: 14,
      task_id: 8,
      reason: "Forgetting",
    },
    {
      id: 15,
      task_id: 9,
      reason:
        "Nothing bad will happen",
    },
    {
      id: 16,
      task_id: 10,
      reason: "Not being in the mood",
    },
    {
      id: 17,
      task_id: 11,
      reason: "Sickness or poor health",
    },
  ]);
};
