import { Response, response } from "express";
import { httpCode } from "../../CommonModels/HttpEnum";

const badRequest = (response: Response, err?: any) : Response => {
    return (
        response.status(httpCode.BadRequest)
        .json({
            status:  'error',
            message: err ?? 'Invalid Data format provided',
        })
    );
}

const successfulResponse = (response: Response, innerMostMessage: string, data?: any): Response => {
    return (
        response.status(httpCode.Success)
        .json({
            status : 'success',
            message: innerMostMessage,
            data   : data ?? null
        })
    )
}

const conflictingResource = (response: Response, innerMostMessage: string): Response => {
    return (
        response.status(httpCode.Conflict).json({
            status          : 'failed',
            outerMessage    : 'Conflicting Resource',
            innerMostMessage: innerMostMessage ?? null
        })
    );
}

const forbidden = (response: Response, innerMostMessage: string): Response => {
    return (
        response.status(httpCode.Unauthorized).json({
            status          : 'failed',
            outerMessage    : 'Forbidden',
            innerMostMessage: innerMostMessage ?? null
        })
    )
}

const internalServerError = (response: Response, innerMostMessage: string): Response => {
    return (
        response.status(httpCode.ServerError).json({
            status          : 'error',
            outerMessage    : 'internal server error',
            innerMostMessage: innerMostMessage ?? null
        })
    )
}

export const HttpResponseHandler = {
    badRequest,
    successfulResponse,
    conflictingResource,
    forbidden,
    internalServerError
};