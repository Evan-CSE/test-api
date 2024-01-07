import express, { Request, Response } from 'express';
import { AuthController } from '../Controller/Auth.Controller';

const router = express.Router();

router.post('/login', AuthController.loginRequest);
router.post('/create-user', AuthController.createUser);
router.get('/verify/:token', AuthController.verifyAccount);

export const AuthRouter = router;