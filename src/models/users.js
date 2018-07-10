const { promisify } = require('util')
const db = require('../db')
const bcrypt = require('bcryptjs')

async function create ({ password, ...body }) {
  const hashed = await promisify(bcrypt.hash)(password, 8)
  return db('users')
    .insert({ ...body, password: hashed })
    .returning('*')
    .then(([response]) => response)
}

function login ({ email, password }) {
  return db('users')
    .where({ email })
    .then(async ([ user ]) => { // async here because this is the function containing "await"
      if (!user) throw new Error() // custom error messages can be made - throws to controller catch (e)

      const isValid = await promisify(bcrypt.compare)(password, user.password)
      if (!isValid) throw new Error()

      return user
    })
}

module.exports = {
  create, login
}
