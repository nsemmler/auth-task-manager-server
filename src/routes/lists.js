const router = require('express').Router()
const ctrl = require('../controllers/lists')
const auth = require('../lib/auth')

router.get('/', auth.isLoggedIn, ctrl.index)
router.get('/:id', auth.isLoggedIn, ctrl.show)
router.post('/', auth.isLoggedIn, ctrl.create)

module.exports = router
