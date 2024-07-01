import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MODEL_NAME } from 'src/commons/constants/database.constant';
import { Model } from 'mongoose';
import { IUser } from './entities/user.entity';
import { encryptString } from 'src/shares/utils';

@Injectable()
export class UserService {
    constructor(@InjectModel(MODEL_NAME.USER) private userModel: Model<IUser>) { }

    async create(createUserDto: CreateUserDto) {
        const newUser = new this.userModel({
            ...createUserDto,
            createdBy: '' //TODO: update thêm user vào
        })
        newUser.password = encryptString(newUser.password)
        return await newUser.save()
    }

    async find(query: any) {
        return await this.userModel.find(query);
    }

    async findOne(id: string) {
        return await this.userModel.findOne({ _id: id });
    }

    async update(id: string, updateData: UpdateUserDto) {
        const user = await this.userModel.findOne({ _id: id })
        if (!user) {
            throw new Error('User not found')//TODO: update sau
        }
        for (const key in updateData) {
            user[key] = updateData[key]
        }
        return await user.save();
    }
}
