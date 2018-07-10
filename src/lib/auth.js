// lib folder - typically houses stuff that doesn't fit within the MVC framework
// i.e. authorization stuff, configuration settings, etc.

const { SECRET_KEY } = process.env // .env file
const { sign, verify } = require('jsonwebtoken')
const db = require('../db')

// generates a token - on Client side insert into header for EVERY client request
function createToken (id) {
  const sub = { sub: { id } }
  const options = { expiresIn: '10 days' }

  return sign(sub, SECRET_KEY, options)
}

// removes 'Bearer ' from the beginning of the Token string
function parseToken (header) {
  const token = header && header.split('Bearer ')[1] // && => if (header) header.split...
  return verify(token, SECRET_KEY)
}

function isLoggedIn (req, res, next) {
  try {
    parseToken(req.headers.authorization)
    next()
  } catch (e) {
    next({ status: 401, error: `Session has expired. Please login again.` })
  }
}

async function isAuthorized (req, res, next) {
  try {
    const authorization = req.headers.authorization
    if (!authorization) return next({ status: 401, error: `You are not authorized to access this route` })

    const token = parseToken(authorization)
    const userId = token.sub.id
    const listId = req.params.listId
    const list = await db('lists').where({ id: listId }).first()

    if (list.user_id !== userId) return next({ status: 401, error: `You are not authorized to update this list` })
    next()
  } catch (e) {
    next({ status: 401, error: `Session has expired. Please login again.` })
  }
}

module.exports = {
  createToken,
  parseToken,
  isLoggedIn,
  isAuthorized
}
