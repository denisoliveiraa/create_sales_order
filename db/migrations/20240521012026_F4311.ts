import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('F4311', (table) => {
    table.uuid('doco').primary(),
    table.string('dcto').primary()
    table.string('kcoo').primary(),
    table.integer('lnid'),
    table.string('contract'),
    table.integer('an8'),
    table.integer('mcu'),
    table.date('upmj'),
    table.integer('uorg'),
    table.integer('urec'),
    table.integer('shan'),
    table.string('litm'),
    table.string('rcto')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('F4311')
}

