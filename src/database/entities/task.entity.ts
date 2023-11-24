// task.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { TaskStatus } from '../../common/enum/task-status.enum';


@Entity('task')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'float' })
    estimationHours: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateExpiration: Date;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.ACTIVE }) // Por defecto, el estado es 'activa'
    status: TaskStatus;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 100.00 }) // Por defecto, el costo es 100.00
    cost: number;

    @CreateDateColumn()
    dateCreation: Date;

    @UpdateDateColumn()
    dateModification: Date;

    @ManyToMany(type => User, assignedUsers => assignedUsers.tasks)
    assignedUsers?: User[];
    
}
