import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MODEL_NAME } from 'src/commons/constants';
import { Model } from 'mongoose';
import { ITransaction } from './entities/transaction.entity';
import { IReqUser } from 'src/shares/interfaces';
import { EntityNotFound } from 'src/shares/exceptions';

@Injectable()
export class TransactionService {
    constructor(@InjectModel(MODEL_NAME.TRANSACTION) private transactionModel: Model<ITransaction>) { }

    async create(body: CreateTransactionDto, reqUser: IReqUser) {
        const newTransaction = new this.transactionModel({
            ...body,
            code: '',//TODO
            created_by: reqUser.userId
        })
        return await newTransaction.save()
    }

    async find(query: any) {
        return await this.transactionModel.find(query);
    }

    async findOne(id: string, reqUser: IReqUser) {
        const transaction = await this.transactionModel.findById(id);
        if (!transaction) {
            throw new EntityNotFound('Transaction')
        }
        return transaction;
    }

    async update(id: string, updateData: UpdateTransactionDto, reqUser: IReqUser) {
        const transaction = await this.transactionModel.findById(id)
        if (!transaction) {
            throw new EntityNotFound('Transaction')
        }
        for (const key in updateData) {
            transaction[key] = updateData[key]
        }
        transaction.updated_by = reqUser.userId
        return await transaction.save();
    }
}
