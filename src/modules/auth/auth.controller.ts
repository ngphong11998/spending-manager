import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';
import { errorResponse, successResponse } from 'src/shares/utils';
import { Response } from 'express';
import { Public } from 'src/shares/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    async login(@Req() req: Request, @Res() res: Response, @Body() body: LoginDto) {
        try {
            const data = await this.authService.login(body)
            return successResponse(res, data)
        } catch (err) {
            return errorResponse(res, err)
        }
    }

    @Public()
    @Post('register')
    async register(@Req() req: Request, @Res() res: Response, @Body() body: any) {

    }
}
