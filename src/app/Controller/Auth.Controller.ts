import { Request, Response } from "express";
import { authService } from "../Service/Auth.Service";
import { UserDTO } from "../Interface/Auth.Interface";
import { Validator } from "../Utitilities/CommonHelper/Validator";
import { HttpResponseHandler } from "../Utitilities/CommonHelper/HTTPResponseHandler";
import { AuthMailer } from "../Service/AuthMailer";
import { commonMessage } from "../Utitilities/CommonMessage";

const loginRequest = async (req: Request, res: Response) => {
    try {
        const user: UserDTO | any = await authService.loginRequest(req.body);

        if (!!user) {
            !user?.verified
                ? HttpResponseHandler.forbidden(res, 'Please verify your email first to log into the account')
                : HttpResponseHandler.successfulResponse(res, 'Login successful', user);
        } else {
            HttpResponseHandler.badRequest(res);
        }
    } catch (err) {
        console.log(err);
        HttpResponseHandler.badRequest(res);
    }
}

const isValidUserInfo = (userInfo: UserDTO) : boolean => {
    return (
        Validator.isValidUserName(userInfo.userName)
        && Validator.isValidMail(userInfo.email)
    );
}

const isEmailAlreadyRegistered = async (email: string): Promise<boolean> => {
    const maybeUserExist = await authService.emailAlreadyRegistered(email);
    return maybeUserExist;
}


const createUser = async (req: Request, res: Response) => {
    try {
        const userDto: UserDTO = req.body;

        userDto.verified          = false;
        userDto.persmissionLevels = [];
        userDto.verificationToken = crypto.randomUUID();

        if (await isEmailAlreadyRegistered(userDto.email)) {

            // we don't want to reveal the info that if specific email is already being registered
            // this prevents user/email enumeration
            const {password, verificationToken, ...result} = userDto;
            return HttpResponseHandler.successfulResponse(res, commonMessage.verifyYourMail, result);
        }
        if (!isValidUserInfo(userDto)) {
            return HttpResponseHandler.badRequest(res);
        }

        const result = await authService.createUser(userDto);

        const {password, ...responseData} = userDto;

        await AuthMailer.sendEmail(userDto.email, 
            '<h1>Verify the mail to continue</h1>',
            `<a href = 'localhost:6622/auth/verify/${userDto.verificationToken}> Click to verify </a>`
            );

        HttpResponseHandler.successfulResponse(
            res,
            commonMessage.verifyYourMail,
            responseData   
        )

    } catch (err: any) {
        HttpResponseHandler.internalServerError(
            res,
            err?.message
        );
    }
}

const verifyAccount = async (req: Request, res: Response) => {
    try {
        const user = authService.verifyAccount(req.params.token);
        HttpResponseHandler.successfulResponse(res, 'Successfully verified');
    } catch (error) {
        HttpResponseHandler.successfulResponse(res, 'Successfully verified');
    }
}

export const AuthController = {
    loginRequest,
    createUser,
    verifyAccount
};