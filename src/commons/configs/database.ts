export default () => ({
    mongoDb: {
        uri: process.env.MONGO_URI,
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_HOST,
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD
    }
})