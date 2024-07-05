import { TRANSACTION_TYPE } from "src/commons/constants";
import { IBaseEntity } from "src/shares/interfaces";

export interface ITransaction extends IBaseEntity {
    code: string;
    type: TRANSACTION_TYPE;
    amount: number;
    group_user_code: string;
    description?: string;
    time_using: number;
}

export interface ITransactionDocument extends ITransaction, Document {}