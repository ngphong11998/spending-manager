import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query, Put } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { errorResponse, successResponse } from 'src/shares/utils';
import { Response } from 'express';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

    @Post('create')
    async create(@Req() req: any, @Res() res: Response, @Body() body: CreateTransactionDto) {
        try {
            const data = await this.transactionService.create(body, req.user)
            return successResponse(res, data)
        } catch (err) {
            return errorResponse(res, err)
        }

    }

    @Get('list')
    async find(@Req() req: any, @Query() query: any) {
        return await this.transactionService.find(query);
    }

    @Get('detail/:id')
    async findOne(@Req() req: any, @Res() res: Response, @Param('id') id: string) {
        try {
            const data = await this.transactionService.findOne(id, req.user);
            return successResponse(res, data)
        } catch (err) {
            return errorResponse(res, err)
        }

    }

    @Put('update/:id')
    async update(@Req() req: any, @Param('id') id: string, @Body() updateUserDto: UpdateTransactionDto) {
        return await this.transactionService.update(id, updateUserDto, req.user);
    }
}
