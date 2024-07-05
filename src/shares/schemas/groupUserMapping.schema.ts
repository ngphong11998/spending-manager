import mongoose from "mongoose";
import { IGroupUserMapping } from "src/modules/groupUserMapping/entities/group-user-mapping.entity";

export const GroupUserMappingSchema = new mongoose.Schema <IGroupUserMapping>(
    {
        group_code: { type: String, require: true, alias: 'groupCode' },
        user_code: { type: String, require: true, alias: 'userCode' },
        //Created, updated user + time
        created_by: { type: String, alias: 'createdBy' },
        updated_by: { type: String, alias: 'updatedBy' },
        created_at: { type: Number, alias: 'createdAt' },
        updated_at: { type: Number, alias: 'updatedAt' },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            currentTime: () => new Date().getTime(),
        },
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        collection: ''//Name of collection
    }
)

//Compound index for group_code and user_code
GroupUserMappingSchema.index({ group_code: 1, user_code: 1 }, { unique: true });//TODO: nhớ test lại

export default GroupUserMappingSchema