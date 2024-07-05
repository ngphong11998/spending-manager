import { IBaseEntity } from "src/shares/interfaces";

export interface IGroupUserMapping extends IBaseEntity {
    group_code: string;
    user_code: string;
}

export interface IGroupUserMappingDocument extends IGroupUserMapping, Document {}