import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
  const dbName = process.env.DB_NAME || 'default_db_name';

  const options: ConnectOptions = {};

  try {
    await mongoose.connect(`${mongoUrl}/${dbName}`, options);
    console.log(`MongoDB connected successfully to database: ${dbName}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;