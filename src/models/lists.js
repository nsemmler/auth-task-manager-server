const db = require('../db')
const tasksModel = require('./tasks')

function get (userId) {
  return db('lists')
    .where({ user_id: userId })
    .then(lists => {
      const ids = lists.map(({ id }) => id)
      return tasksModel.get()
        .whereIn('list_id', ids)
        .then(tasks => {
          return lists.map(list => {
            const filtered = tasks.filter(task => task.list_id === list.id)
            return { ...list, tasks: filtered }
          })
        })
    })
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
