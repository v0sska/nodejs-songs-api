import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
  const dbName = process.env.DB_NAME || 'songs';
  const user = process.env.MONGO_INITDB_ROOT_USERNAME || 'root';
  const pass = process.env.MONGO_INITDB_ROOT_PASSWORD || 'example';

  const options: ConnectOptions = {
    user,
    pass,
    dbName
  };

  try {
    await mongoose.connect(mongoUrl, options);
    console.log(`MongoDB connected successfully to database: ${dbName}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;