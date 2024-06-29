import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { mapSchemasWithModelName } from './shares/schemas';
import { MODEL_NAME } from './commons/constants/database.constant';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        // MongooseModule.forRoot('mongodb://localhost:27017/spending_manager'),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
                // connectionFactory(connection, name) {
                //     const uriDB = configService.get<string>('MONGO_URI')
                //     connection.on("connecting", () => {
                //         console.log(`Connect database '${uriDB}' is processing`)
                //     })
                //     connection.on("connected", () => {
                //         console.log(`Connect database '${uriDB}' successfully`)
                //     })
                //     connection.on("disconnected", () => {
                //         console.log(`Disconnected database '${uriDB}' ${connection.readyState}`)
                //     })
                //     connection.on("error", error => {
                //         console.log(`Error when connect database: ${error.message || JSON.stringify(error)}}`)
                //         if (
                //             error.message.includes(
                //                 "Server selection timed out"
                //             )
                //         ) {
                //             connection._events.disconnected();
                //             connection._events.connected();
                //         }
                //         return connection;
                //     })
                // },
            }),
            inject: [ConfigService]
        }),
        MongooseModule.forFeatureAsync(
            mapSchemasWithModelName(Object.values(MODEL_NAME))
        )
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
