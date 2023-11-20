import express, { Request, Response, Application } from 'express';
import { AuthRouter } from './app/Routes/Auth.Route';

const APP: Application = express();

APP.use(express.json());
APP.use('/auth', AuthRouter);

export default APP;