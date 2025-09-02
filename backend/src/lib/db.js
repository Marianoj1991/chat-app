import mongoose from 'mongoose'


export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`MongoDB connection error ${err}`);
  }
}