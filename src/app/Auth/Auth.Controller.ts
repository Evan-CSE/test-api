import { Request, Response } from "express";
import { authService } from "./Auth.Service";

const loginRequest =
    (req: Request, res: Response) => {
        res.send('<h1> Uer logged in </h1>');
    }

const createUser = async (req: Request, res: Response) => {
    try {
        const userDto = req.body;
        console.log(`Data received from post request: `);
        console.log(userDto);
        const result  = await authService.createUser(userDto);

        res.status(200).json({
            status: 'success',
            message: 'User creation successful',
            data: result
        });
    } catch (err: any) {
        console.log(`Error occurred: ${err}`);
        res.status(500).json({
            status: 'error',
            outerMessage: 'internal server error',
            innerMostMessage: err?.message
        })
    }
}

export const AuthController = {
    loginRequest,
    createUser
};