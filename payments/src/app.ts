import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@smwentumgittiks/common';

import { createChargeRouter } from './routes/new';

import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

app.use(createChargeRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
