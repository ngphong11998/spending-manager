import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;
}
