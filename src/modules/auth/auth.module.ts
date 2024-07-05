import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/commons/configs/app.config'
import { MongooseModule } from '@nestjs/mongoose';
import { mapSchemasWithModelName } from 'src/shares/schemas';
import { MODEL_NAME } from 'src/commons/constants';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: config().SERVER.JWT_KEY,
            signOptions: { expiresIn: '5s' },//config().SERVER.EXPIRE_TIME_TOKEN
        }),
        MongooseModule.forFeatureAsync(
            mapSchemasWithModelName([MODEL_NAME.USER])
        )
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
