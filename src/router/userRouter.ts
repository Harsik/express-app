import {Router} from 'express'
import {userController} from "../controller"

const router = Router()

router.get('/users', userController.findUsers)
router.get('/user/:username', userController.findUser)
router.post('/user', userController.createUser)
router.delete('/user/:username', userController.deleteUser)
router.put('/user/:username', userController.saveUser)

export default router