import { Response } from "express"
import { ResponseErrorDto, ResponseSuccessDto } from "../dtos/response.dto"

export const successResponse = (res: Response, data: any): Response => {
    const responseData = new ResponseSuccessDto(data)
    return res.status(200).json(responseData).end()
}

export const errorResponse = (res: Response, error: any): Response => {
    const responseData = new ResponseErrorDto(error)
    return res.status(400).json(responseData).end()
}