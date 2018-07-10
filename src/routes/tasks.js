const router = require('express').Router({ mergeParams: true })
const ctrl = require('../controllers/tasks')
const auth = require('../lib/auth')

router.post('/', auth.isAuthorized, ctrl.create) // isAuthorized middleware before tasks.create
router.patch('/:id', auth.isAuthorized, ctrl.patch)
router.delete('/:id', auth.isAuthorized, ctrl.destroy)

module.exports = router
