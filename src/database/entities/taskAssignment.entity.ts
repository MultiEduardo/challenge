import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, PrimaryColumn, JoinColumn } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity('task_assignment')
export class TaskAssignment {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'task_id' })
  taskId: number;

  @ManyToOne(type => Task, task => task.assignedUsers)
  @JoinColumn([{name: 'task_id', referencedColumnName: 'id'}])
  task: Task[];

  @ManyToOne(type => User, user => user.tasks)
  @JoinColumn([{name: 'user_id', referencedColumnName: 'id'}])
  assignedUsers: User[];
}
