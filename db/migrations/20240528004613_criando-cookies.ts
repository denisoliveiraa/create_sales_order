import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('F4311', table => {
    table.string('sessionId');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('<table name>', table => {
    table.dropColumn('sessionId');
  })
}

