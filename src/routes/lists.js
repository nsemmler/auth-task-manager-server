const router = require('express').Router()
const ctrl = require('../controllers/lists')
const auth = require('../lib/auth')

router.get('/', auth.isLoggedIn, ctrl.index) // before ctrl.index, auth.isLoggedIn
router.post('/', auth.isLoggedIn, ctrl.create)
router.delete('/:listId', auth.isAuthorized, ctrl.destroy)

module.exports = router
