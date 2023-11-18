import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    PORT: process.env.PORT,
    MONGODB_BASE_URL: process.env.BASE_MONGODB_URL
};