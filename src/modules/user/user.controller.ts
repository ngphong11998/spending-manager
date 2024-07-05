import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { errorResponse, successResponse } from 'src/shares/utils';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('create')
    async create(@Req() req: Request, @Res() res: Response, @Body() body: CreateUserDto) {
        try {
            const data = await this.userService.create(body)
            return successResponse(res, data)
        } catch (err) {
            return errorResponse(res, err)
        }

    }

    @Get('list')
    async find(@Req() req: Request, @Query() query: any) {
        return await this.userService.find(query);
    }

    @Get('detail/:id')
    async findOne(@Req() req: Request, @Res() res: Response, @Param('id') id: string) {
        try {
            const data = await this.userService.findOne(id);
            return successResponse(res, data)
        } catch (err) {
            return errorResponse(res, err)
        }

    }

    @Put('update/:id')
    async update(@Req() req: Request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(id, updateUserDto);
    }
}
