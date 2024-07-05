import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGroupUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    code: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;
}
