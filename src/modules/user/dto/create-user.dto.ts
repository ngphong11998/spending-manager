import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { USER_TYPE } from "src/commons/constants";

export class CreateUserDto {
    @ApiProperty({
        default: 'user'
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsIn(Object.values(USER_TYPE))
    type?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    phone: string;
}
