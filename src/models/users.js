const db = require('../db')
const bcrypt = require('bcryptjs')

function create ({ password, ...body }) {
  const hashed = bcrypt.hashSync(password)
  return db('users')
    .insert({ ...body, password: hashed })
    .returning('*')
    .then(([response]) => response)
}

function login ({ email, password }) {
  return db('users')
    .where({ email })
    .then(([ user ]) => {
      if (!user) throw new Error()

      const isValid = bcrypt.compareSync(password, user.password)
      if (!isValid) throw new Error()

      return user
    })
}

module.exports = {
  create, login
}
