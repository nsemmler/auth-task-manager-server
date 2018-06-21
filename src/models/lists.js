const db = require('../db')

function get (id) {
  return id ? db('lists').where({ id }).first() : db('lists')
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
  get, create, destroy
}
