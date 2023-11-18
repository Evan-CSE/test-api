import express, { Request, Response, Application } from 'express';
import config from './app/config';
import { AuthRouter } from './app/Auth/Auth.Route';

const APP: Application = express();

APP.use(express.json());
APP.use('/auth', AuthRouter);

export default APP;