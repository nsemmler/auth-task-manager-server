const router = require('express').Router()
const ctrl = require('../controllers/tasks')

router.get('/', ctrl.index)
router.get('/:id', ctrl.show)
router.post('/', ctrl.create)
router.patch('/:id', ctrl.patch)
router.delete('/:id', ctrl.destroy)

module.exports = router
