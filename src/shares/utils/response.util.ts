import { Response } from "express"
import { ResponseErrorDto, ResponseSuccessDto } from "../dtos/response.dto"
import { HttpException, HttpStatus, Logger } from "@nestjs/common"

export const successResponse = (res: Response, data: any): Response => {
    const responseData = new ResponseSuccessDto(data)
    return res.status(200).json(responseData).end()
}

export const errorResponse = (res: Response, error: any): Response => {
    Logger.error(`ERROR: ` + JSON.stringify(error))
    const responseData = new ResponseErrorDto(error)
    return res.status(400).json(responseData).end()
}

export const UnauthenticatedResponse = (errorMsg: string): Error => {
    const responseData = new ResponseErrorDto({
        error_code: "Unauthenticated",
        message: errorMsg
    })
    return new HttpException(responseData, 401)
}