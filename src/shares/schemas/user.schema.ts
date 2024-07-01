import mongoose from "mongoose";
import { ACTIVE_STATUS, USER_TYPE } from "src/commons/constants";
import { IUser } from "src/modules/user/entities/user.entity";

const UserSchema = new mongoose.Schema<IUser>(
    {
        code: { type: String, unique: true, require: true },
        type: { type: String, enum: USER_TYPE, default: USER_TYPE.USER },
        fullname: { type: String },
        email: { type: String, require: true, unique: true },
        password: { type: String, select: false },
        phone: { type: String },
        status: { type: String, enum: ACTIVE_STATUS, default: ACTIVE_STATUS.ACTIVE },
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
        collection: 'user'
    }
)

export default UserSchema