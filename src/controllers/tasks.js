const { plural } = require('pluralize')
const model = require('../models/tasks')
const resourceName = 'task'

async function index (req, res, next) {
  const response = await model.get()
  res.json({ [ plural(resourceName) ]: response })
}

async function show (req, res, next) {
  const id = req.params.id
  const response = await model.find(id)

  res.json({ [resourceName]: response })
}

async function create (req, res, next) {
  try {
    const response = await model.create(req.body)
    res.status(201).json({ [resourceName]: response })
  } catch (e) {
    next({
      status: 400,
      error: `Task could not be created`
    })
  }
}

async function patch (req, res, next) {
  const id = req.params.id
  const response = await model.patch(id, req.body)

  res.json({ [resourceName]: response })
}

async function destroy (req, res, next) {
  const id = req.params.id
  const response = await model.destroy(id)

  res.json({ [resourceName]: response })
}

module.exports = {
  index, show, create, patch, destroy
}
