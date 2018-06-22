exports.up = knex => {
  return knex.schema.alterTable('tasks', async table => {
    const hasColumn = await knex.schema.hasColumn('list_id')
    if (hasColumn) await table.dropColumn('list_id')

    await table.integer('list_id')
    await table.foreign('list_id').references('lists.id').onDelete('CASCADE')
  })
}

exports.down = knex => {
  return knex.schema.alterTable('tasks', table => {
    table.dropColumn('list_id')
  })
}
