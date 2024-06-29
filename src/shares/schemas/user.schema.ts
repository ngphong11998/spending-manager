import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        code: { type: String, unique: true, require: true },
        type: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
        fullname: { type: String },
        email: { type: String, require: true },
        password: { type: String, select: false },
        phone: { type: String },
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