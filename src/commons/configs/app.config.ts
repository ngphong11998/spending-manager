const configEnv = process.env

export default () => ({
    SERVER: {
        PORT: configEnv.PORT,
        INTERNAL_SECRET_KEY: configEnv.INTERNAL_SECRET_KEY,
        EXPIRE_TIME_TOKEN: configEnv.EXPIRE_TIME_TOKEN
    }
})