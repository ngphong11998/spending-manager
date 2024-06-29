import UserSchema from './user.schema'
import TransactionSchema from './transaction.schema'
import GroupUserSchema from './groupUser.schema'
import GroupUserMappingSchema from './groupUserMapping.schema'
import { MODEL_NAME } from 'src/commons/constants/database.constant'
import mongoose from 'mongoose'
import { HttpException, HttpStatus } from '@nestjs/common'
import { AsyncModelFactory } from '@nestjs/mongoose'

const SCHEMA_WITH_MODEL_NAME = {
    [MODEL_NAME.USER]: UserSchema,
    [MODEL_NAME.TRANSACTION]: TransactionSchema,
    [MODEL_NAME.GROUP_USER]: GroupUserSchema,
    [MODEL_NAME.GROUP_USER_MAPPING]: GroupUserMappingSchema
}
const mapSchemasWithModelName = (modelNames: string[]): AsyncModelFactory[] => {
    return modelNames.map(modelName => {
        if (!Object.values(MODEL_NAME).includes(modelName) || !SCHEMA_WITH_MODEL_NAME[modelName]) {
            throw new HttpException(
                {
                    name: 'Schema not found',
                    message: `Schema with name '${modelName}' not found in System`
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        return { name: modelName, useFactory: () => { return SCHEMA_WITH_MODEL_NAME[modelName] }}
            // model: SCHEMA_WITH_MODEL_NAME[modelName] }
    })
}

export {
    UserSchema,
    TransactionSchema,
    GroupUserSchema,
    GroupUserMappingSchema,
    mapSchemasWithModelName
}