/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("tasks", function (table) {
    table.dropColumn("completion_status");
    table.boolean("is_completed").defaultTo(false);
    table.string("procrastination_reason").nullable().defaultTo("").alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("tasks", function (table) {
    table.dropColumn("is_completed");
    table.string("completion_status").notNullable();
    table.string("procrastination_reason").notNullable().alter();
  });
};
