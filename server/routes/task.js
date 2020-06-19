const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', TaskController.getAll)
router.post('/', TaskController.create)
router.get('/:id', authorization, TaskController.getById)
router.put('/:id', authorization, TaskController.update)
router.delete('/:id', authorization, TaskController.delete)

module.exports = router