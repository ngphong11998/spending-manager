export class ResponseDto extends Response {
    status_code: number;
    message: string;
    data?: any;
    error?: any;
}

export class ResponseSuccessDto extends ResponseDto {
    constructor(data){
        super()
        this.message = "Sucessfully"
        this.data = data
    }
}

export class ResponseErrorDto extends ResponseDto {
    constructor(error){
        super()
        this.message = "ERROR"
        this.error = {
            error_code: error.error_code,
            error_msg: error?.message,
            error_data: JSON.stringify(error)
        }
    }
}