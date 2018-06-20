exports.seed = async knex => {
  await knex('tasks').del()
  await knex('lists').del()
  await knex('users').del()
}
