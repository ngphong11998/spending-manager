import * as CryptoJS from 'crypto-js'
import config from 'src/commons/configs/app.config'

export const encryptString = (str: string): string => {
    return CryptoJS.HmacSHA256(str, config()?.SERVER?.JWT_KEY).toString()
}

export const comparePassword = (inputPassword: string, userPassword: string): boolean => {
    return encryptString(inputPassword) === userPassword
}