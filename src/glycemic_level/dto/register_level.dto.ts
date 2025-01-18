import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class RegisterLevelDTO {

    @ApiProperty({ description: 'Tipo de registro', example: 'RANDOM' })
    @IsOptional()
    type: string;

    @ApiProperty({ description: 'Nível glicêmico registrado', example: 120 })
    @IsNumber()
    @Min(0)
    level: number;

    @ApiProperty({ description: 'Data do registro (opcional)', example: '01/01/2025' })
    @IsNotEmpty()
    registerDate: string;

}