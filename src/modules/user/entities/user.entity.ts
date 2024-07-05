import { Document } from "mongoose";
import { ACTIVE_STATUS, USER_TYPE } from "src/commons/constants";
import { IBaseEntity } from "src/shares/interfaces";

export interface IUser extends IBaseEntity{
    type: USER_TYPE;
    fullname?: string;
    email: string;
    password: string;
    phone?: string;
    status: ACTIVE_STATUS;
}

export interface IUserDocument extends IUser, Document {}