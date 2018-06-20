const table = 'lists'
exports.seed = knex => {
  return knex(table).insert([
    { id: 1, user_id: 2, title: 'Personal Tasks' },
    { id: 2, user_id: 2, title: 'Work Tasks' },
    { id: 3, user_id: 1, title: 'Homework' }
  ]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  })
}
