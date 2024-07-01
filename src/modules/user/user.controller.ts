import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('create')
    async create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Get('list')
    async find(@Req() req: Request, @Query() query: any) {
        return await this.userService.find(query);
    }

    @Get('detail/:id')
    async findOne(@Req() req: Request, @Param('id') id: string) {
        return await this.userService.findOne(id);
    }

    @Put('update/:id')
    async update(@Req() req: Request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(id, updateUserDto);
    }
}
