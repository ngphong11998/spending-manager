import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mapSchemasWithModelName } from 'src/shares/schemas';
import { MODEL_NAME } from 'src/commons/constants/database.constant';

@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            mapSchemasWithModelName([
                MODEL_NAME.USER
            ])
        )
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
