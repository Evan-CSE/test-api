import { Request, Response } from "express";
import { authService } from "../Service/Auth.Service";
import { UserDTO } from "../Interface/Auth.Interface";
import { Validator } from "../CommonHelper/Validator";
import { HttpResponseHandler } from "../CommonHelper/HTTPResponseHandler";
import { AuthMailer } from "../Service/AuthMailer";

const loginRequest =
    (req: Request, res: Response) => {
        res.send('<h1> User logged in </h1>');
    }

const isValidUserInfo = (userInfo: UserDTO) : boolean => {
    return (
        Validator.isValidUserName(userInfo.userName)
        && Validator.isValidMail(userInfo.email)
    );
}

const createUser = async (req: Request, res: Response) => {
    try {
        const userDto: UserDTO = req.body;
        
        // TODO: also check if this email is registered
        if (!isValidUserInfo(userDto)) {
            return HttpResponseHandler.badRequest(res);
        }

        const result  = await authService.createUser(userDto);
        await AuthMailer.sendEmail(userDto.email, '<h1>Verify the mail to continue</h1>', '<h1> okay </h1');
        console.log("\n\nVerification mail sent");

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