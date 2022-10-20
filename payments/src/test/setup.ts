import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

jest.mock('../nats-wrapper');

declare global {
  var signin: (id?: string) => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'ajsdfasdf';
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();

  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  //build a json {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  //create the jwt

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //build session object

  const session = { jwt: token };

  // turn that session int json

  const sessionJson = JSON.stringify(session);
  //take json and encode it as base64

  const base64 = Buffer.from(sessionJson).toString('base64');

  //return string that  is the cookie
  return [`session=${base64}`];
};
