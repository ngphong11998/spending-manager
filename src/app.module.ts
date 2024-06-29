import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { mapSchemasWithModelName } from './shares/schemas';
import { MODEL_NAME } from './commons/constants/database.constant';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                console.log(`configService.get<string>('MONGO_URI'): `, configService.get<string>('MONGO_URI'))
                return {
                    //mongo//configService.get<string>('MONGO_URI'),
                    uri: 'mongodb://127.0.0.1:27017/spending_manager',
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                    poolSize: 10,
                    // replicaSet: db.replicaSet || null,
                    connectionFactory: (connection: any, connectionName) => {
                        console.log(`-----herreeeeeeee`)
                        connection.on("connecting", () => {
                            console.log("mongo is connecting");
                        });
                        connection.on("connected", () => {
                            console.log("mongo connected success");
                        });
                        connection.on("disconnected", () => {
                            console.log(
                                `mongo disconnected
                                ${connection.readyState}`
                            );
                        });

                        connection.on("error", error => {
                            if (
                                error.message.includes(
                                    "Server selection timed out"
                                )
                            ) {
                                connection._events.disconnected();
                                connection._events.connected();
                            }
                        });
                        return connection;
                    }
                }
            },
            inject: [ConfigService],
        }),
        MongooseModule.forFeatureAsync(
            mapSchemasWithModelName(Object.values(MODEL_NAME))
        )
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
