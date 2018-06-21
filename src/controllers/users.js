const model = require('../models/users')
const auth = require('./auth')
const resourceName = 'user'

async function signup (req, res, next) {
  try {
    const response = await model.create(req.body)
    const { password, ...user } = response
    const token = auth.createToken(user.id)

    res.status(201).json({ [resourceName]: user, token })
  } catch (e) {
    next({ status: 400, error: `User could not be registered` })
  }
}

async function login (req, res, next) {
  try {
    const response = await model.login(req.body)
    const { password, ...user } = response
    const token = auth.createToken(user.id)

    res.json({ [resourceName]: user, token })
  } catch (e) {
    next({ status: 401, error: `Email or password is incorrect` })
  }
}

async function isLoggedIn (req, res, next) {
  try {
    auth.parseToken(req.token)
    res.sendStatus(200)
  } catch (e) {
    next({ status: 401, error: `User is not authorized to access that route` })
  }
}

module.exports = {
  signup, login, isLoggedIn
}
