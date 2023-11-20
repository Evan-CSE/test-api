import express, { Request, Response } from 'express';
import { AuthController } from '../Controller/Auth.Controller';

const router = express.Router();

router.get('/login', AuthController.loginRequest);
router.post('/create-user', AuthController.createUser);

export const AuthRouter = router;