import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { TRANSACTION_TYPE } from "src/commons/constants";

export class CreateTransactionDto {
    @ApiProperty()
    @IsString()
    @IsIn(Object.values(TRANSACTION_TYPE))
    type: string;

    @ApiProperty()
    @IsNumber()
    @Min(1000)
    amount: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    group_user_code: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsNumber()
    time_using: number;
}
