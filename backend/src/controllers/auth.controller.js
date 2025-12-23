import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { generateToken, hashPassword } from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body || {}

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        status: 'fail',
        data: {
          error: 'All fields "fullName, email and password" are required'
        }
      })
    }
    if (password.length < 8) {
      return res.status(400).json({
        status: 'fail',
        data: {
          error: 'Password must be at least 8 characters'
        }
      })
    }

    const user = await User.findOne({ email })

    if (user)
      return res.status(400).json({
        status: 'fail',
        data: {
          error: 'Email is already registered'
        }
      })

    const hashedPassword = await hashPassword(password)

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    })

    if (newUser) {
      generateToken(newUser._id, res)
      await newUser.save()

      const { __v, password, ...restUser } = newUser.toObject()

      res.status(201).json({
        status: 'success',
        data: { ...restUser }
      })
    } else {
      res.status(400).json({
        status: 'fail',
        data: {
          error: 'Invalid user data'
        }
      })
    }
  } catch (err) {
    console.log('Error in signup controller: ', err.message)
    res.status(err?.status || 500).json({
      data: {
        error: err.message
      }
    })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body || {}

  try {
    const user = await User.findOne({ email })

    if (!user) {
      res.status(400).json({
        status: 'fail',
        data: {
          error: 'Invalid credentials'
        }
      })
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 'fail',
        data: {
          error: 'Invalid credentials'
        }
      })
    }

    generateToken(user._id, res)

    res.status(200).json({
      status: 'success',
      data: user.toObject()
    })
  } catch (err) {
    console.log('Error in signIn controller: ', err.message)
    res.status(err?.status || 500).json({
      data: {
        error: err.message
      }
    })
  }
}

export const logout = (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Logged out successfully'
      }
    })
  } catch (err) {
    console.error('Error in logout controller: ', err.message)
    res.status(err?.status || 500).json({
      data: {
        error: err.message
      }
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id

    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        data: {
          error: 'Profile pic is required'
        }
      })
    }

    const result = await new Promise((res, rej) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) rej(error)
        res(result)
      })
      stream.end(req.file.buffer)
    })

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: result.secure_url },
      { new: true }
    )

    res.status(200).json({
      status: 'success',
      data: updatedUser.toObject()
    })
  } catch (err) {
    console.error('Error in updateProfilePicture', err)
    res.status(500).json({
      status: 'fail',
      data: {
        error: 'Updated failed'
      }
    })
  }
}

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: req.user.toObject()
    })
  } catch (err) {
    console.error('Error in chechAuth controller', err.message)
    res.status(500).json({
      status: 'fail',
      data: {
        error: 'Internal Server Error'
      }
    })
  }
}
