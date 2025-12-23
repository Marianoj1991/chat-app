import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development'
  })

  return token
}

export const hashPassword = async (pass) => {
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(pass, salt)
  return hashedPassword
}
