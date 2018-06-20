const { hashSync } = require('bcryptjs')

const table = 'users'
exports.seed = knex => {
  return knex(table).insert([
    {
      id: 1,
      first_name: 'Alexa',
      last_name: 'Student',
      email: 'student@galvanize.com',
      password: hashSync('password')
    },
    {
      id: 2,
      first_name: 'Gene',
      last_name: 'Instructor',
      email: 'instructor@galvanize.com',
      password: hashSync('password')
    }
  ]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  })
}
