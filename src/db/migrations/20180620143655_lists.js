exports.up = knex => {
  return knex.schema.createTable('lists', table => {
    table.increments()
    table.string('title').notNullable()
    table.integer('user_id').references('users.id')
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable('lists')
}
