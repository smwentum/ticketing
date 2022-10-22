import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {

  console.log('starting up...!!!!!');
  console.log('starting up... and up ....');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connected to mongo db');
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log('listing on port 3000!!!!!');
});

start();
