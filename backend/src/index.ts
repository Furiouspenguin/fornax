import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import devicesRouter from './routes/devices';
import cors from 'cors'
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
const mongodbUrl: string = process.env.MONGO_URL || 'mongodb://admin:SecurePassword123@192.168.0.67:27017/devices_db?authSource=admin';
mongoose.connect(mongodbUrl).then(() => {
  console.log('Connected to MongoDB database.');
});


app.use(cors())
app.use(express.json());
app.use('/devices', devicesRouter)

//basic error handling
const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message)
  res.status(400).send(err.message)
}
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const closeMongoose = async () => {
  await mongoose.disconnect();
  console.log('Database connection closed.');
  process.exit(0);
}
process.on('SIGINT', closeMongoose);
process.on('SIGTERM', closeMongoose);