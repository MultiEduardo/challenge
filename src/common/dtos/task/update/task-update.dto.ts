import { IsOptional, IsString, IsNumber, IsDateString, IsArray, IsEnum } from 'class-validator';
import { TaskStatus } from 'src/common/enum/task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsNumber()
  estimationHours?: number;

  @IsOptional()
  @IsDateString()
  dateExpiration?: string;

  @IsOptional()
  @IsArray()
  assignedUsers?: number[];
  
  // Otras propiedades que pueden ser actualizadas
}
