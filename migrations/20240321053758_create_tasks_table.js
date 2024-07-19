/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table
      .integer("goal_id")
      .unsigned()
      .references("goals.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("description").notNullable();
    table.date("due_date").notNullable();
    table.string("completion_status").notNullable();
    table.string("procrastination_reason").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
