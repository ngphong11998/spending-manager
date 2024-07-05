import { Types } from "mongoose";

export interface IBaseEntity {
    created_by: string | Types.ObjectId;
    updated_by: string | Types.ObjectId;
    created_at: number | Date;
    updated_at: number | Date;
}