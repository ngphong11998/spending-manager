import { request } from "express";
import { Mongoose, Types } from "mongoose";

export interface IReqUser {
    userId: string | Types.ObjectId;
    email: string;
}