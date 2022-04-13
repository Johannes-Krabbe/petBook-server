import {Router} from 'express'
import { indexController } from '../controllers/indexController'
import { userController } from '../controllers/userController'

const router = Router()

router.use('/', indexController)
router.use('/user/', userController)


export default router