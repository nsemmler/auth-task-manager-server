const db = require('../db')

function get (userId) {
  return db('lists').where({ user_id: userId })
}

function find (id) {
  return db('lists').where({ id }).first()
}

function create (body) {
  return db('lists')
    .insert(body)
    .returning('*')
    .then(([response]) => response)
}

function destroy (id) {
  return db('lists')
    .where({ id })
    .del()
    .returning('*')
    .then(([response]) => response)
}

module.exports = {
  get, find, create, destroy
}
