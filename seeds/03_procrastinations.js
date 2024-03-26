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
      reason: "no need to rush I still have time for it",
    },
    {
      id: 2,
      task_id: 1,
      reason: "Forgetting",
    },
    {
      id: 3,
      task_id: 1,
      reason: "Not feeling in the mood to do it",
    },
    {
      id: 4,
      task_id: 2,
      reason: "Forgetting",
    },
    {
      id: 5,
      task_id: 3,
      reason: "Not feeling in the mood to do it",
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
        "nothing bad will happen, no punishment, and no one will find out",
    },
    {
      id: 8,
      task_id: 6,
      reason:
        "waste time overthinking about what needs to be done and how to do the task instead of starting working on it and engaging in it step by step",
    },
    {
      id: 9,
      task_id: 7,
      reason:
        "Delaying one task in favor of working on another is a sign of the habit of perfectionism stuck on one step to make it perfect instead of keeping going and improving the whole perspective little by little",
    },
    {
      id: 10,
      task_id: 7,
      reason: "Forgetting",
    },
    {
      id: 11,
      task_id: 7,
      reason: "sickness or poor health",
    },
    {
      id: 12,
      task_id: 7,
      reason: "sickness or poor health",
    },
    {
      id: 13,
      task_id: 7,
      reason: "sickness or poor health",
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
        "nothing bad will happen no punishment and no one find it out = Lacking the initiative to get started",
    },
    {
      id: 16,
      task_id: 10,
      reason: "not feeling in the mood to do it",
    },
    {
      id: 17,
      task_id: 11,
      reason: "sickness or poor health",
    },
  ]);
};
