import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ali:ali@cluster0.mj7cyym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};


export default connectDB


