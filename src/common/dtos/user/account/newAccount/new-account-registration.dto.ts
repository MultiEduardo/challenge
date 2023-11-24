
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RolStatus } from '../../../../enum/rol-status.enum';

export class NewAccountRegistrationDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsEnum(RolStatus)
    rol: RolStatus;
}
