const db = require('../db')

function get () {
  return db('tasks')
}

function find (id) {
  return db('tasks').where({ id }).first()
}

function create (body) {
  return db('tasks')
    .insert(body)
    .returning('*')
    .then(([response]) => response)
}

function patch (id, body) {
  return find(id).then(response => {
    return db('tasks')
      .update({
        ...response,
        ...body,
        updated_at: new Date()
      })
      .where({ id })
      .returning('*')
      .then(([response]) => response)
  })
}

function destroy (id) {
  return db('tasks')
    .where({ id })
    .del()
    .returning('*')
    .then(([response]) => response)
}

module.exports = {
  get, find, create, patch, destroy
}
