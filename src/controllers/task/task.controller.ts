import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Res } from "@nestjs/common";
import { TaskService } from '../../common/services/task/task.service';
import { CreateTaskDto } from '../../common/dtos/task/createTask/new-task.dto';
import { TaskFilterDTO } from '../../common/dtos/task/filter/task-filter.dto';
import { UpdateTaskDto } from '../../common/dtos/task/update/task-update.dto';


@Controller('task')
export class TaskController {

  constructor(private readonly taskService: TaskService) { }

  /**
   * @description_EN Handle the creation of a new task
   * @description_ES Manejar la creación de una nueva tarea
   * @param createTaskDto 
   * @since 0.0.1
   * 
   * @author Bryan Vazquez
   */
  @Post('register')
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  /**
   * @description_EN Obtaining filtered tasks according to a set of criteria
   * @description_ES Obtener tareas filtradas según un conjunto de criterios
   * @param taskFilterDto 
   * @since 0.0.1
   * 
   * @author Bryan Vazquez
   */
  @Get('filter')
  async getTasks(@Body() taskFilterDto: TaskFilterDTO) {
    return await this.taskService.getTasks(taskFilterDto);
  }


  /**
   * @description_EN Update a specific task by its ID
   * @description_ES Actualizar una tarea específica por su ID
   * @param id 
   * @param updateTaskDto 
   * @since 0.0.1
   * 
   * @author Bryan Vazquez
   */
  @Patch('update/:id')
  async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.updateTask(id, updateTaskDto);
  }

  /**
   * @description_EN Delete a task by ID
   * @description_ES Eliminar una tarea por su ID
   * @param id 
   * @since 0.0.1
   * 
   * @author Bryan Vazquez
   */
  @Delete('delete/:id')
  async deleteTask(@Param('id') id: number) {
    await this.taskService.deleteTask(id);
    return { message: 'Tarea eliminada correctamente' };
  }

}