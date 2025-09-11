import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if(!token) {
      return res.status(401).json({
        status: 'fail',
        data: {
          error: 'Unauthorized - No Token provided'
        }
      })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if(!decodedToken) {
      return res.status(401).json({
        status: 'fail',
        data: {
          error: 'Unauthorized - Invalid Token'
        }
      })
    }

    const user = await User.findById(decodedToken.userId).select('-password')

    if(!user) {
      return res.status(404).json({
        status: 'fail',
        data: {
            error: 'User not found'
        }
      })
    }

    req.user = user

    next()

  } catch (err) {

      console.log('Error in protectRoute middleware', err.message);

  } 
}