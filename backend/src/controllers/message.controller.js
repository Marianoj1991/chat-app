import cloudinary from '../lib/cloudinary.js'
import Message from '../models/message.model.js'
import User from '../models/user.model.js'

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      '-password'
    )

    res.status(200).json({
      status: 'success',
      data: { filteredUsers }
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
        { senderId: loggedUser, recerverId: userToChatId },
        { senderId: userToChatId, recerverId: loggedUser }
      ]
    })

    res.status(200).json({
      status: 'success',
      data: {
        messages
      }
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

      const { id: recerverId } = req.params
      const senderId = req.user._id
      const { text, image } = req.body

      let imageUrl; 

      if (image) {
        const updaloImageResponse = await cloudinary.uploader.upload(image)
        imageUrl = updaloImageResponse.secure_url
      }

      const newMessage = new Message({
        senderId, recerverId, text, image: imageUrl
      })

      await newMessage.save()

      // TODO: realtime functionality goes here ==> socket.io

      res.status(200).json({
        status: 'success',
        data: {
          newMessage
        }
      })

    } catch (err) {
      console.log('Error in sendMessage controller method', err);
      res.status(500).json({
        status: 'fail',
        data: {
          error: err.message || 'Internal server error'
        }
      })
    }

  }
