const router = require('express').Router()
const ctrl = require('../controllers/users')

router.get('/', ctrl.index)

module.exports = router
