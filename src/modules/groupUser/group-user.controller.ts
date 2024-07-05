import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query, Put } from '@nestjs/common';
import { GroupUserService } from './group-user.service';
import { CreateGroupUserDto } from './dto/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/update-group-user.dto';
import { errorResponse, successResponse } from 'src/shares/utils';
import { Response } from 'express';

@Controller('group-user')
export class GroupUserController {
    constructor(private readonly groupUserService: GroupUserService) { }

    @Post('create')
    async create(@Req() req: any, @Res() res: Response, @Body() body: CreateGroupUserDto) {
        try {
            const data = await this.groupUserService.create(body, req.user)
            return successResponse(res, data)
        } catch (err) {
            return errorResponse(res, err)
        }
    }

    @Get('list')
    async find(@Req() req: any, @Res() res: Response, @Query() query: any) {
        try {
            const data = await this.groupUserService.find(query);
            return successResponse(res, data)
        } catch (err) {
            return errorResponse(res, err)
        }
    }

    @Get('detail/:id')
    async findOne(@Req() req: any, @Res() res: Response, @Param('id') id: string) {
        try {
            const data = await this.groupUserService.findOne(id, req.user);
            return successResponse(res, data)
        } catch (err) {
            return errorResponse(res, err)
        }
    }

    @Put('update/:id')
    async update(@Req() req: any, @Res() res: Response, @Param('id') id: string, @Body() updateUserDto: UpdateGroupUserDto) {
        try {
            const data = await this.groupUserService.update(id, updateUserDto, req.user);
            return successResponse(res, data)
        } catch (err) {
            return errorResponse(res, err)
        }
    }
}
