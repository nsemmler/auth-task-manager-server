const router = require('express').Router({ mergeParams: true })
const ctrl = require('../controllers/tasks')
const auth = require('../lib/auth')

router.post('/', auth.isAuthorizedToUpdateTask, ctrl.create)
router.patch('/:id', auth.isAuthorizedToUpdateTask, ctrl.patch)
router.delete('/:id', auth.isAuthorizedToUpdateTask, ctrl.destroy)

module.exports = router
