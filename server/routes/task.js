const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', TaskController.getAll)
router.post('/', TaskController.create)
router.get('/:id', TaskController.getById)
router.put('/:id', TaskController.update)
router.delete('/:id', TaskController.delete)

module.exports = router