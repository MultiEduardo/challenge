
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { TaskStatus } from '../../../enum/task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  estimationHours: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dateExpiration: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNotEmpty()
  @IsArray()
  assignedUsers: number[];

  @IsNotEmpty()
  @IsNumber()
  cost: number;
}
