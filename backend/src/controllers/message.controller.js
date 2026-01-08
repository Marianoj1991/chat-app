import cloudinary from '../lib/cloudinary.js'
import { getReceiverSocketId, io } from '../lib/socket.js'
import Message from '../models/message.model.js'
import User from '../models/user.model.js'

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
      .select('-password')
      .lean()

    res.status(200).json({
      status: 'success',
      data: filteredUsers
    })
  } catch (err) {
    console.log('Error in getUsersForSidebar: ', err.message)
    res.status(err.status || 500).json({
      status: 'fail',
      data: {
        error: err.message
      }
    })
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const loggedUser = req.user._id

    const messages = await Message.find({
      $or: [
        { senderId: loggedUser, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: loggedUser }
      ]
    }).lean()

    res.status(200).json({
      status: 'success',
      data: messages
    })
  } catch (err) {
    console.log('Error in getMessages: ', err.message)
    res.status(err.status || 500).json({
      status: 'fail',
      data: {
        error: err.message
      }
    })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params
    const senderId = req.user._id
    const { text } = req.body

    let imageUrl

    if (req.file) {
      const result = await new Promise((res, rej) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) rej(error)
          res(result)
        })
        stream.end(req.file.buffer)
      })

      imageUrl = result.secure_url
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    })

    await newMessage.save()

    // TODO: realtime functionality goes here ==> socket.io

    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage.toObject())
    }

    res.status(200).json({
      status: 'success',
      data: newMessage.toObject()
    })
  } catch (err) {
    console.log('Error in sendMessage controller method', err)
    res.status(500).json({
      status: 'fail',
      data: {
        error: err.message || 'Internal server error'
      }
    })
  }
}
