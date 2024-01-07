import express, { Request, Response } from 'express';
import { AuthController } from '../Controller/Auth.Controller';
import { verifyToken } from '../MiddleWare/VerifyToken';

const router = express.Router();

router.post('/login', AuthController.loginRequest);
router.post('/create-user', AuthController.createUser);
router.get('/verify/:token', AuthController.verifyAccount);
router.get('/getSignal',verifyToken, AuthController.getSignal);
router.get('/addPaidUser/:email', verifyToken, AuthController.addPaidUserByMail);

export const AuthRouter = router;