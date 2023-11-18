import express, { Request, Response, Application } from 'express';
import config from './app/config';

const APP: Application = express();

APP.listen(config.PORT, () => {
    console.log(`Listening on port: ${config.PORT}`);
})

export default APP;