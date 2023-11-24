// user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Task } from './task.entity';
import { RolStatus } from '../../common/enum/rol-status.enum';
import { TaskAssignment } from './taskAssignment.entity';


@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({type:'varchar', length: 100 ,unique: true})
  email: string;

  @Column({
    type: 'enum',
    enum: RolStatus,
    default: RolStatus.MIEMBRO,
  })
  rol: RolStatus;

  @CreateDateColumn()
  dateCreation: Date;

  @UpdateDateColumn()
  dateModification: Date;
 
  /**
   * @description_EN Configuration of the join table for the many-to-many relationship
   * @description_ES Configuración de la tabla de unión para la relación many-to-many
   */
  @ManyToMany(type => Task, task => task.assignedUsers)
  @JoinTable({
    name: 'task_assignment',
    joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id'
    },
    inverseJoinColumn: {
        name: 'task_id',
        referencedColumnName: 'id'
    }
})
  tasks?: Task[];
}
