import mongoose from "mongoose";
import { TRANSACTION_TYPE } from "src/commons/constants";
import { ITransaction } from "src/modules/transaction/entities/transaction.entity";

const TransactionSchema = new mongoose.Schema<ITransaction>(
    {
        code: { type: String, unique: true, require: true },
        type: { type: String, enum: TRANSACTION_TYPE, default: TRANSACTION_TYPE.OUT },
        group_user_code: { type: String, require: true, alias: 'groupUserCode' },
        amount: { type: Number },
        description: { type: String },
        time_using: { type: Number, alias: 'timeUsing' },
        created_by: { type: String, alias: 'createdBy' },
        updated_by: { type: String, alias: 'updatedBy' },
        created_at: { type: Number, alias: 'createdAt' },
        updated_at: { type: Number, alias: 'updatedAt' },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            currentTime: () => new Date().getTime()
        },
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        collection: 'transaction'
    }
)

export default TransactionSchema;