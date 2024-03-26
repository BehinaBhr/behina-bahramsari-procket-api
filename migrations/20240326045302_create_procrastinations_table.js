/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("procrastinations", (table) => {
      table.increments("id").primary();
      table
        .integer("task_id")
        .unsigned()
        .references("tasks.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("reason").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("procrastinations");
  };
  