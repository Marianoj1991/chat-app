import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { generateToken } from '../lib/utils.js'
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
    if (password.length < 6) {
      return res.status(400).json({
        status: 'fail',
        data: {
          error: 'Password must be at least 6 characters'
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

    // HASH PASSWORD
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    })

    if (newUser) {
      generateToken(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        status: 'success',
        data: { newUser }
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
      data: {
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic
      }
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
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0
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
    const { profilePic } = req.body

    const userId = req.user._id

    if (!profilePic) {
      return res.status(400).json({
        status: 'fail',
        data: {
          error: 'Profile pic is required'
        }
      })
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic)

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    )

    res.status(200).json({
      status: 'success',
      data: {
        updatedUser
      }
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
      status:'success',
      data: {
        user: req.user
      }
    })
  } catch (err) {
    console.error('Error in chechAuth controller', err.message)
    res.status(500).json({
      status:'fail',
      data: {
        error: 'Internal Server Error'
      }
    })
  }

}