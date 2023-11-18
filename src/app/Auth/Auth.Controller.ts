import { Request, Response } from "express";
import { authService } from "./Auth.Service";
import { UserDTO } from "./Auth.Interface";
import { Validator } from "../CommonHelper/Validator";
import { HttpResponseHandler } from "../CommonHelper/HTTPResponseHandler";

const loginRequest =
    (req: Request, res: Response) => {
        res.send('<h1> Uer logged in </h1>');
    }

const isValidUserInfo = (userInfo: UserDTO) : boolean => {
    return (
        userInfo.id > 0
        && Validator.isValidMail(userInfo.email)
    );
}

const createUser = async (req: Request, res: Response) => {
    try {
        const userDto: UserDTO = req.body;
        
        if (!isValidUserInfo(userDto)) {
            return HttpResponseHandler.badRequest(res);
        }

        const result  = await authService.createUser(userDto);

        HttpResponseHandler.successfulResponse(
            res,
            'User creation successful',
            result
        )

    } catch (err: any) {
        HttpResponseHandler.internalServerError(
            res,
            err?.message
        );
    }
}

export const AuthController = {
    loginRequest,
    createUser
};