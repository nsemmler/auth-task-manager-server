const model = require('../models/users')

async function index (req, res, next) {
  const users = await model.get()
  res.json({ users })
}

module.exports = {
  index
}
