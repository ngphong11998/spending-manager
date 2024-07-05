import { Injectable } from '@nestjs/common';
import { CreateGroupUserDto } from './dto/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/update-group-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MODEL_NAME } from 'src/commons/constants';
import { Model } from 'mongoose';
import { IGroupUser } from './entities/group-user.entity';
import { IReqUser } from 'src/shares/interfaces';
import { EntityNotFound } from 'src/shares/exceptions';

@Injectable()
export class GroupUserService {
    constructor(
        @InjectModel(MODEL_NAME.GROUP_USER) private groupUserModel: Model<IGroupUser> 
    ){}

    async create(body: CreateGroupUserDto, reqUser: IReqUser) {
        const newGroupUser = new this.groupUserModel({
            ...body,
            created_by: reqUser.userId
        })
        return await newGroupUser.save();
    }

    async find(query: any) {
        const filter = query;
        return `This action returns all groupUser`;
    }

    async findOne(id: string, reqUser: IReqUser) {
        const groupUser = await this.groupUserModel.findById(id)
        if(!groupUser){
            throw new EntityNotFound(`Group User`)
        }
        return groupUser;
    }

    async update(id: string, body: UpdateGroupUserDto, reqUser: IReqUser) {
        const groupUser = await this.groupUserModel.findById(id)
        if (!groupUser) {
            throw new EntityNotFound(`Group User`)
        }

        const updateData = body
        for(const key in updateData){
            groupUser[key] = updateData[key]
        }
        groupUser.updated_by = reqUser.userId
        return await groupUser.save()
    }
}
