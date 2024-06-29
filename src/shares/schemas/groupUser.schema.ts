import mongoose from "mongoose";

const GroupUserSchema = new mongoose.Schema(
    {
        code: { type: String, unique: true, require: true },
        name: { type: String },
        description: { type: String },
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
        collection: 'group-user'
    }
)

export default GroupUserSchema