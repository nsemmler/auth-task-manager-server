exports.up = knex => {
  return knex.schema.createTable('tasks', table => {
    table.increments()
    table.string('title').notNullable()
    table.text('description').notNullable().defaultsTo('')
    table.boolean('completed').notNullable().defaultsTo(false)
    table.integer('list_id').references('lists.id')
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable('tasks')
}
