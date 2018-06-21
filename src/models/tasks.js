const db = require('../db')

function get (id) {
  return id ? db('tasks').where({ id }).first() : db('tasks')
}

function create (body) {
  return db('tasks')
    .insert(body)
    .returning('*')
    .then(([response]) => response)
}

function patch (id, body) {
  return get(id).then(response => {
    return db('tasks')
      .update({
        ...response,
        ...body
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
  get, create, patch, destroy
}
