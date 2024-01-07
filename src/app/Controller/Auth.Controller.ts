import { Request, Response } from "express";
import { authService } from "../Service/Auth.Service";
import { UserDTO } from "../Interface/Auth.Interface";
import { Validator } from "../Utitilities/CommonHelper/Validator";
import { HttpResponseHandler } from "../Utitilities/CommonHelper/HTTPResponseHandler";
import { AuthMailer } from "../Service/AuthMailer";
import { commonMessage } from "../Utitilities/CommonMessage";
import { generatePasswordHash, generateToken } from "../Utitilities/HelperMethods";
import AuthModel from "../Model/Auth.Model";
import bcrypt from 'bcrypt';
import { UserSession } from "../Model/UserSession.Model";
import { PermissionLevel } from "../Model/PermissionLevel";

const loginRequest = async (req: Request, res: Response) => {
    try {
        const userDto: AuthModel  = req.body;
        const user: UserDTO | any = await authService.loginRequest(userDto);
        const password            = user?.password;
      
        if (!!user) {
            const correctPassword = await bcrypt.compare(userDto.password, password);

            const userSessionToken: UserSession = generateToken(user);

            !user?.verified || !correctPassword
                ? HttpResponseHandler.forbidden(res, 'Your mail is not verified or you provided a wrong password')
                : HttpResponseHandler.successfulResponse(res, 'Login successful', userSessionToken);
        } else {
            HttpResponseHandler.badRequest(res, "User not found with the credentials");
        }
    } catch (err) {
        console.log(err);
        HttpResponseHandler.badRequest(res, err);
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
        const hashedPass       = await generatePasswordHash(userDto.password);

        userDto.password          = hashedPass;
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

const getSignal = async (req: Request, res: Response) => {
    const {userEmail}       = (req as any).user;
    const updatedUser       = await authService.getUserByEmail(userEmail);
    const persmissionLevels = (updatedUser as UserDTO).persmissionLevels;

    console.log(updatedUser)
    if (persmissionLevels && persmissionLevels.includes(PermissionLevel.PaidMember)) {
        HttpResponseHandler.successfulResponse(res, "Please wait for signal");
    } else {
        HttpResponseHandler.forbidden(res, "You need to be a paid member to view this page");
    }
}

const addPaidUserByMail = async (req: Request, res: Response) => {
    try {
        const {userEmail}       = (req as any).user;
        const updatedUser       = await authService.getUserByEmail(userEmail);
        const persmissionLevels = (updatedUser as UserDTO).persmissionLevels;
        
        if (persmissionLevels && persmissionLevels.includes(PermissionLevel.RootUser)) {
            const {password, ...result} = await authService.addPaidUserByMail(req.params.email) as any;
            if (!!result) {
               HttpResponseHandler.successfulResponse(res, "Paid Member added successfully", result);
            }
        } else {
            HttpResponseHandler.forbidden(res, "You are unauthorized to view this page");
        }
    } catch (err) {
        HttpResponseHandler.internalServerError(res, err as string);
    }
}

export const AuthController = {
    loginRequest,
    createUser,
    verifyAccount,
    getSignal,
    addPaidUserByMail
};