const { SECRET_KEY } = process.env
const { sign, verify } = require('jsonwebtoken')

function createToken (id) {
  const sub = { sub: { id } }
  const options = { expiresIn: '10 days' }

  return sign(sub, SECRET_KEY, options)
}

function parseToken (token) {
  return verify(token, SECRET_KEY)
}

module.exports = { createToken, parseToken }
