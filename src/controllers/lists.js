const { plural } = require('pluralize')
const model = require('../models/lists')
const resourceName = 'list'

async function index (req, res, next) {
  const response = await model.get()
  res.json({ [ plural(resourceName) ]: response })
}

async function show (req, res, next) {
  const id = req.params.id
  const response = await model.get(id)

  res.json({ [resourceName]: response })
}

async function create (req, res, next) {
  const response = await model.create(req.body)

  res.status(201).json({ [resourceName]: response })
}

module.exports = {
  index, show, create
}
