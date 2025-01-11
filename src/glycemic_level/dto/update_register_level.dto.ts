import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class UpdateRegisterLevelDTO {

    @IsOptional()
    type: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    level: number;

    @IsNotEmpty()
    @IsOptional()
    registerDate: string;

    @IsOptional()
    rate?: string;

    @IsOptional()
    rateColor?: string;
}