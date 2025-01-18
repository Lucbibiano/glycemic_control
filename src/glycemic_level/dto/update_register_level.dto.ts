import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class UpdateRegisterLevelDTO {

    @ApiProperty({ description: 'Novo tipo de registro', example: 'FAST' })
    @IsOptional()
    type: string;

    @ApiProperty({ description: 'Novo nível glicêmico', example: 110 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    level: number;

    @ApiProperty({ description: 'Data do registro (opcional)', example: '01/01/2025' })
    @IsNotEmpty()
    @IsOptional()
    registerDate: string;

    @IsOptional()
    rate?: string;

    @IsOptional()
    rateColor?: string;
}