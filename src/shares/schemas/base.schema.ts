// import mongoose from "mongoose";

// export const BaseSchema = new mongoose.Schema(
//     {
//         code: { type: String, unique: true, require: true },
//         //Created, updated user + time
//         created_by: { type: String, alias: 'createdBy' },
//         updated_by: { type: String, alias: 'updatedBy' },
//         created_at: { type: Number, alias: 'createdAt' },
//         updated_at: { type: Number, alias: 'updatedAt' },
//     },
//     {
//         timestamps: {
//             createdAt: 'created_at',
//             updatedAt: 'updated_at',
//             currentTime: () => new Date().getTime(),
//         },
//         toObject: { virtuals: true },
//         toJSON: { virtuals: true },
//         collection: ''//Name of collection
//     }
// )

// export default BaseSchema