const db = require('../db')

function get () {
  return db('users')
}

module.exports = { get }
