import * as Crypto from 'crypto-js'
import config from 'src/commons/configs/app.config'

export const encryptString = (str: string): string => {
    return Crypto.encrypt(str, config()?.SERVER?.INTERNAL_SECRET_KEY).toString()
}