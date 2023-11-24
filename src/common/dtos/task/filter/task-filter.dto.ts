import { IsDate, IsDateString, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from '../../../enum/task-status.enum';
import { Type } from "class-transformer";

export class TaskFilterDTO {

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dateExpiration: Date;
  
    @IsOptional()
    @IsString()
    title: string;
  
    @IsOptional()
    @IsString()
    assignedUserName: string;
  
    @IsOptional()
    @IsEmail()
    assignedUserEmail: string;
  
    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus;
  
}