require('dotenv').load()

const db = require('../src/db')
const knex = require('knex')
const config = require('../knexfile')[process.env.NODE_ENV]
let connection = knex(config)

beforeEach(() => {
  connection = knex(config)
  return connection.migrate.latest(config)
    .then(() => connection.seed.run())
})

afterEach(() => {
  return connection.migrate.rollback(config).then(() => connection.destroy())
})

after(() => db.destroy())
