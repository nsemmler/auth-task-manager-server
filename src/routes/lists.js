const router = require('express').Router()
const ctrl = require('../controllers/lists')

router.get('/', ctrl.index)
router.get('/:id', ctrl.show)
router.post('/', ctrl.create)

module.exports = router
