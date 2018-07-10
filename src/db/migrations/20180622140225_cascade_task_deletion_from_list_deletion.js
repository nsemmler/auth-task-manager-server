exports.up = knex => {
  return knex.schema.table('tasks', table => {
    table.dropColumn('list_id')
  }).then(() => knex.schema.table('tasks', table => {
    table.integer('list_id')
    table.foreign('list_id').references('lists.id').onDelete('CASCADE')
  }))
}

exports.down = knex => {
  return knex.schema.table('tasks', table => {
    table.dropColumn('list_id')
  })
}
