import * as dotenv from 'dotenv'
dotenv.config()
const configEnv = process.env

export default () => ({
    SERVER: {
        PORT: configEnv.PORT,
        JWT_KEY: configEnv.JWT_KEY,
        EXPIRE_TIME_TOKEN: configEnv.EXPIRE_TIME_TOKEN
    }
})