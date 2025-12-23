import { Router } from 'express'
import { protectRoute } from '../middlewares/auth.middleware.js'
import { getMessages, getUsersForSideBar, sendMessage } from '../controllers/message.controller.js'
import upload from '../middlewares/upload.js'

const router = Router()

router.get('/users', protectRoute, getUsersForSideBar )
router.get('/:id', protectRoute, getMessages)

router.post(
  '/send/:id',
  [protectRoute, upload.single('image')],
  sendMessage
)


export default router