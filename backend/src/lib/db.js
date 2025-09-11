import mongoose from 'mongoose'

let connection = null

export async function connectDB() {

  if(!connection) {
    try {
      connection = await mongoose.connect(process.env.MONGO_URI)  
      console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (err) {
      console.log(`MongoDB connection error ${err}`);
    }
  }

}