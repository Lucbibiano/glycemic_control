import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class RegisterLevelDTO {

    @IsOptional()
    type: string;

    @IsNumber()
    @Min(0)
    level: number;

    @IsNotEmpty()
    registerDate: string;

}