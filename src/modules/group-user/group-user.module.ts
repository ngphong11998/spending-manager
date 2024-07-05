import { Module } from '@nestjs/common';
import { GroupUserService } from './group-user.service';
import { GroupUserController } from './group-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mapSchemasWithModelName } from 'src/shares/schemas';
import { MODEL_NAME } from 'src/commons/constants/database.constant';

@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            mapSchemasWithModelName([
                MODEL_NAME.GROUP_USER,
                MODEL_NAME.GROUP_USER_MAPPING
            ])
        )
    ],
    controllers: [GroupUserController],
    providers: [GroupUserService],
})
export class GroupUserModule { }
