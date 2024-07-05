import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MODEL_NAME } from 'src/commons/constants/database.constant';
import { Model } from 'mongoose';
import { IUser } from './entities/user.entity';
import { encryptString } from 'src/shares/utils';
import { IReqUser } from 'src/shares/interfaces';
import { EntityNotFound } from 'src/shares/exceptions';

@Injectable()
export class UserService {
    constructor(@InjectModel(MODEL_NAME.USER) private userModel: Model<IUser>) { }

    async create(createUserDto: CreateUserDto, reqUser: IReqUser) {
        const newUser = new this.userModel({
            ...createUserDto,
            created_by: reqUser.userId
        })
        newUser.password = encryptString(newUser.password)
        return await newUser.save()
    }

    async find(query: any) {
        return await this.userModel.find(query);
    }

    async findOne(id: string, reqUser: IReqUser) {
        const user = await this.userModel.findById(id);
        if(!user){
            throw new EntityNotFound('User')
        }
        return user;
    }

    async update(id: string, updateData: UpdateUserDto, reqUser: IReqUser) {
        const user = await this.userModel.findById(id)
        if (!user) {
            throw new EntityNotFound('User')
        }
        for (const key in updateData) {
            user[key] = updateData[key]
        }
        user.updated_by = reqUser.userId
        return await user.save();
    }
}
