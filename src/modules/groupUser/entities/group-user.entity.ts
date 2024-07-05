import { IBaseEntity } from "src/shares/interfaces";

export interface IGroupUser extends IBaseEntity {
    code: string;
    name: string;
    description?: string
}

export interface IGroupUserDocument extends IGroupUser, Document {}