
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { RolStatus } from '../../../enum/rol-status.enum';

export class UserFilterDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsEnum(RolStatus)
    rol: RolStatus;
}
