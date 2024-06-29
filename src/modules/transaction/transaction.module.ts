import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mapSchemasWithModelName } from 'src/shares/schemas';
import { MODEL_NAME } from 'src/commons/constants/database.constant';

@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            mapSchemasWithModelName([
                MODEL_NAME.TRANSACTION
            ])
        )
    ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
