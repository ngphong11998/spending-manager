import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from "@nestjs/jwt";
import { Model } from 'mongoose';
import { ACTIVE_STATUS, MODEL_NAME } from 'src/commons/constants';
import { IUser } from '../user/entities/user.entity';
import { LoginDto, ResponseLoginDto } from './dtos/login.dto';
import { encryptString } from 'src/shares/utils';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(MODEL_NAME.USER) private userModel: Model<IUser>,
        private jwtService: JwtService
    ) { }

    async login(body: LoginDto): Promise<ResponseLoginDto> {
        const { email, password } = body
        const user = await this.userModel.findOne({ email, status: ACTIVE_STATUS.ACTIVE }, "+password")
        if (!user) {
            throw new Error('User not found')
        }
        if(encryptString(password) !== user.password){
            throw new Error('Password incorrect')
        }
        const dataPayload = {
            userId: user._id,
            userCode: user.code,
            email: user.email
        }
        return { 
            access_token: this.jwtService.sign(dataPayload)
        }
    }
}
