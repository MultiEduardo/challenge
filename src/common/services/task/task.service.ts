import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from '../../../database/entities/task.entity';
import { Like, Repository } from "typeorm";
import { CreateTaskDto } from '../../dtos/task/createTask/new-task.dto';
import { User } from '../../../database/entities/user.entity';
import { TaskFilterDTO } from '../../dtos/task/filter/task-filter.dto';
import { UpdateTaskDto } from '../../dtos/task/update/task-update.dto';
import { TaskAssignment } from '../../../database/entities/taskAssignment.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TaskAssignment)
    private readonly taskAssignmentRepository: Repository<TaskAssignment>
  ) { }

  /**
   * @description_EN Method for creating tasks.
   * @description_ES Metodo para crear las tareas.
   * @param createTaskDto  
   * @since 0.0.1
   * 
   * @returns 
   * @author Bryan Vazquez
   */

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, estimationHours, dateExpiration, status, assignedUsers, cost } = createTaskDto;

    /**
     * EN -> Verify if there is a user assigned.
     * ES -> Verifica si hay un usuario asignado.
     */
    if (!assignedUsers || assignedUsers.length === 0) {
      throw new BadRequestException('Debes asignar al menos un usuario a la tarea');
    }

    /**
     * EN -> Check if users exist.
     * ES -> Verificar si los usuarios existen.
     */
    const usersExist = await this.userRepository.findByIds(assignedUsers);
    if (usersExist.length !== assignedUsers.length) {
      throw new NotFoundException('Al menos uno de los usuarios proporcionados no existe');
    }

    /**
     * EN -> Create a new instance of Task.
     * ES -> Crear una nueva instancia de Task.
     */
    const task = new Task();
    task.title = title;
    task.description = description;
    task.estimationHours = estimationHours;
    task.dateExpiration = new Date(dateExpiration);
    task.status = status;
    task.cost = cost;

    const savedTask = await this.taskRepository.save(task);

    /**
     * EN -> Create the relationships between the task and the assigned users.
     * ES -> Crear las relaciones entre la tarea y los usuarios asignados.
     */
    const taskAssignments = assignedUsers.map(userId => {
      const taskAssignment = new TaskAssignment();
      taskAssignment.taskId = savedTask.id;
      taskAssignment.userId = userId;

      return taskAssignment;
    });

    /**
     * EN -> Save the relationships in the TaskAssignment table.
     * ES -> Guardar las relaciones en la tabla TaskAssignment.
     */
    await this.taskAssignmentRepository.save(taskAssignments);

    /**
     * EN -> Assign existing users to the assignedUsers property of the task.
     * ES -> Asignar los usuarios existentes a la propiedad assignedUsers de la tarea.
     */
    savedTask.assignedUsers = usersExist;

    return savedTask;
  }


  /**
   * @description_EN We obtain the information of the tasks by filters.
   * @description_ES Obtenemos la informacion de las tareas por filtros.
   * @param taskFilterDto 
   * @since 0.0.1
   * 
   * @returns 
   * @author Bryan Vazquez
   */


  public async getTasks(taskFilterDto: TaskFilterDTO): Promise<Task[]> {
    const { dateExpiration, title, assignedUserName, assignedUserEmail, status } = taskFilterDto;

    /**
     * EN -> Obtain all tasks without filtering
     * ES -> Obtener todas las tareas sin filtrar
     */
    const allTasks = await this.taskRepository.find({ relations: ['assignedUsers'] });

    /**
     * EN -> Filter tasks based on the name, status and email of the assigned user.
     * ES -> Filta tareas basadas en el nombre, estatus, correo electrónico del usuario asignado
     */
    const filteredTasks = allTasks.filter(task => {
      const dateCondition = !dateExpiration || task.dateExpiration === new Date(dateExpiration);
      const titleCondition = !title || task.title.includes(title);
      const statusCondition = !status || task.status === status;

      /**
        * EN -> Check filter by name and email of assigned user.
        * ES -> Verificar el filtro por nombre y correo electrónico del usuario asignado
        */
      const userCondition =
        (!assignedUserName || task.assignedUsers.some(user => user.name.includes(assignedUserName))) &&
        (!assignedUserEmail || task.assignedUsers.some(user => user.email.includes(assignedUserEmail)));

      /**
        * EN -> Combine all conditions to filter the task
        * ES -> Combinar todas las condiciones para filtrar la tarea
        */
      return dateCondition && titleCondition && statusCondition && userCondition;
    });

    return filteredTasks;
  }


  /**
   * @description_EN We update the task data.
   * @description_ES Actualizamos los datos de task. 
   * @param id
   * @param updateTaskDto 
   * @since 0.0.1
   *
   * @returns 
   * @author Bryan Vazquez
   */

  public async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: id } });

    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }


    /**
      * EN -> If the property exists in updateTaskDto, it is assigned to the task object.
      * ES -> Si la propiedad existe en updateTaskDto, se asigna al objeto task.
      */
    const propertiesToUpdate = ['title', 'status', 'cost', 'description', 'estimationHours', 'dateExpiration'];

    propertiesToUpdate.forEach(prop => {
      if (updateTaskDto[prop] !== undefined) {
        if (prop === 'dateExpiration') {
          task[prop] = new Date(updateTaskDto[prop]);
        } else {
          task[prop] = updateTaskDto[prop];
        }
      }
    });

    /**
    * EN -> Variable to store the updated users.
    * ES -> Variable para almacenar los usuarios actualizados.
    */
    let updatedUsers: User[] = [];

    if (updateTaskDto.assignedUsers) {
      const assignedUserIds = updateTaskDto.assignedUsers;

      /**
      * EN -> Verify if all the provided users were found.
      * ES -> Verificar si se encontraron todos los usuarios proporcionados.
      */
      const assignedUsers = await this.userRepository.findByIds(assignedUserIds);
      if (assignedUsers.length !== assignedUserIds.length) {
        throw new NotFoundException('Uno o más usuarios no fueron encontrados');
      }

      /**
      * EN -> Store the updated users.
      * ES -> Almacenar los usuarios actualizados.
      */
      if (updateTaskDto.assignedUsers) {
        updatedUsers = assignedUsers;

        /**
        * EN -> Delete the current user assignments in TaskAssignment.
        * ES -> Eliminar las asignaciones de usuarios actuales en TaskAssignment.
        */
        await this.taskAssignmentRepository.delete({ taskId: id });



        /**
        * EN -> Create new assignments in TaskAssignment for updated users.
        * ES -> Crear nuevas asignaciones en TaskAssignment para los usuarios actualizados.
        */
        const taskAssignments = assignedUsers.map(user => {
          const taskAssignment = new TaskAssignment();
          taskAssignment.taskId = id;
          taskAssignment.userId = user.id;
          return taskAssignment;
        });

        /**
        * EN -> Save the new assignments in TaskAssignment.
        * ES -> Guardar las nuevas asignaciones en TaskAssignment.
        */

        await this.taskAssignmentRepository.save(taskAssignments);
      }
    }
    const savedTask = await this.taskRepository.save(task);
    /**
     * EN -> Return the task with the updated users in the response JSON.
     * ES -> Devolver la tarea con los usuarios actualizados en el JSON de respuesta. 
     */
    return { ...savedTask, assignedUsers: updatedUsers };
  }


  /**
   * @description_EN We delete the tasks together with the assignments 
   * @description_ES Eliminamos las tareas junto con las asignaciónes 
   * @param id 
   * @since 0.0.1
   * 
   * @returns 
   * @author Bryan Vazquez
   */

  public async deleteTask(id: number): Promise<Task | null> {
    const task = await this.taskRepository.findOne(id, { relations: ['assignedUsers'] });

    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }

    /**
      * EN -> Delete the users assigned to the task from the TaskAssignment intermediate table.
      * ES -> Eliminar los usuarios asignados a la tarea de la tabla intermedia TaskAssignment.
      */
    await this.taskAssignmentRepository.createQueryBuilder()
      .delete()
      .from('task_assignment')
      .where('taskId = :taskId', { taskId: id })
      .execute();

    await this.taskRepository.remove(task);

    return task;
  }

}
