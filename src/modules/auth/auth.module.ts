import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/commons/configs/app.config'

@Module({
    imports: [JwtModule.register({
        global: true,
        secret: config().SERVER.INTERNAL_SECRET_KEY,
        signOptions: { expiresIn: config().SERVER.EXPIRE_TIME_TOKEN },
    }),],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
