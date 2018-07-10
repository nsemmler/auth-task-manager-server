const model = require('../models/users')
const auth = require('../lib/auth')

async function signup (req, res, next) {
  try {
    const response = await model.create(req.body) // do this entirely until done
    const token = auth.createToken(response.id)

    res.status(201).json({ token })
  } catch (e) { // catches thrown errors in model
    // log out errors thrown by model - the message for the user is below
    next({ status: 400, error: `User could not be registered` })
  }
}

async function login (req, res, next) {
  try {
    const response = await model.login(req.body)
    const token = auth.createToken(response.id)

    res.json({ token })
  } catch (e) {
    next({ status: 401, error: `Email or password is incorrect` })
  }
}

module.exports = {
  signup, login
}
