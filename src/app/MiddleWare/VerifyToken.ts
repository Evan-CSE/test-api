import jsonwebtoken from "jsonwebtoken"
import config from "../config"
import { HttpResponseHandler } from "../Utitilities/CommonHelper/HTTPResponseHandler";
import { Response, Request } from "express";

export const verifyToken = (req: Request, res: Response, next: Function) => {
   try {
    const token = req.headers.authorization;
    if (!token) {
        return HttpResponseHandler.forbidden(res, "Unauthorized token");
    }
    const userInfo = jsonwebtoken.verify(token, config.JWT_SECRET_KEY as string);
    (req as any).user = userInfo;
    next();
   } catch (error) {
    console.log(error);
    HttpResponseHandler.internalServerError(res, "Token verification failed");
   }
};