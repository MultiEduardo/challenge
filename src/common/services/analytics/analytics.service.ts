import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from '../../../database/entities/user.entity';
import { Task } from '../../../database/entities/task.entity';
import { Repository } from "typeorm";
import { TaskStatus } from '../../enum/task-status.enum';

@Injectable()
export class AnalyticsService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) { }

  /**
   * @description_EN We obtain detailed information about the user and the tasks assigned.
   * @description_ES Obtenemos la información detallada del usuario y de las tareas asiganadas
   * @since 0.0.1
   * 
   * @returns 
   * @author Bryan Vazquez
   */
  public async getTasksPerUser(): Promise<{ user_Name: string; task_Total: number; completed_Tasks: number; active_Tasks: number, total_Cost: number }[]> {
    const users = await this.userRepository.find({ relations: ['tasks'] });

    /**
     * EN -> Gathers information about the user's tasks plus costs.
     * ES -> Recopila infromación sobre las tareas del usuario mas los costos
     */
    const tasksPerUser = users.map(user => {
      const completedTasks = user.tasks.filter(task => task.status === TaskStatus.DONE).length;
      const activeTasks = user.tasks.filter(task => task.status === TaskStatus.ACTIVE).length;
      const totalTasks = completedTasks + activeTasks;
      const totalCost = user.tasks
        .reduce((acc, task) => {
          if (task.status === TaskStatus.DONE) {
            return acc + Number(task.cost);
          }
          return acc;
        }, 0);

      return {
        user_Name: user.name,
        task_Total: totalTasks,
        completed_Tasks: completedTasks,
        active_Tasks: activeTasks,
        total_Cost: totalCost
      };
    });

    return tasksPerUser;
  }

  /**
     * @description_EN Obtains the average number of hours of task estimation assigned per user.
     * @description_ES Obtiene el promedio de horas de estimación de tareas asignadas por usuario.
     * @since 0.0.1
     * 
     * @returns 
     * @author Bryan Vazquez
     */

  public async getAverageEstimationHoursByUser(): Promise<any[]> {
    const tasks = await this.taskRepository.find({ relations: ['assignedUsers'] });

    /**
     * EN -> Calculates average estimation hours per user
     * ES -> Calcula el promedio de horas de estimación por usuario
     */
    const usersAverageEstimation = tasks.reduce((acc, task) => {
      task.assignedUsers.forEach(user => {
        if (!acc[user.id]) {
          acc[user.id] = {
            user_Id: user.id,
            user_Name: user.name,
            totalEstimationHours: 0,
            taskCount: 0,
          };
        }
        acc[user.id].totalEstimationHours += task.estimationHours || 0;
        acc[user.id].taskCount++;
      });
      return acc;
    }, {});

    /**
       * EN -> We map the results to obtain the average number of estimated hours per user.
       * ES -> Mapeamos los resultados para obtener el promedio de horas de estimación por usuario
       */
    const result = Object.keys(usersAverageEstimation).map(userId => {
      const user = usersAverageEstimation[userId];
      return {
        user_Id: user.user_Id,
        user_Name: user.user_Name,
        average: user.totalEstimationHours / user.taskCount || 0,
      };
    });

    return result;
  }

}