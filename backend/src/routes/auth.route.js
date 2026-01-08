import express from 'express'
import { body } from 'express-validator'
import { handleValidationErrors } from '../middlewares/validator.middleware.js'
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile
} from '../controllers/auth.controller.js'
import { protectRoute } from '../middlewares/auth.middleware.js'
import upload from '../middlewares/upload.js'

const router = express.Router()

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('fullName').notEmpty().withMessage('Full name is required')
  ],
  handleValidationErrors,
  signup
)

router.post('/login', login)

router.post('/logout', logout)

router.put(
  '/update-profile',
  [protectRoute, upload.single('profilePic')],
  updateProfile
)

router.get('/check', protectRoute, checkAuth)

export default router
